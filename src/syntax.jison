
/* description: Latte language parser */

%lex

%%
\s+                       /* skip whitespace */
"//".*                    /* skip line comments */
"/*"((\*+[^/*])|([^*]))*\**"*/" /* skip block comments */

true                      return 'TRUE'
false                     return 'FALSE'
if                        return 'IF'
else                      return 'ELSE'
while                     return 'WHILE'
for                       return 'FOR'
new                       return 'NEW'
class                     return 'CLASS'
return                    return 'RETURN'
extends                   return 'EXTENDS'
[0-9]+                    return 'NUMBER'
[a-zA-Z_][0-9a-zA-Z_]*    return 'IDENT'
L?\"(\\.|[^\\"])*\"       return 'STRING_IDENT'
"[]"                      return 'ARRAY'
"++"                      return 'INCR'
"--"                      return 'DECR'
"*"                       return '*'
"/"                       return '/'
"-"                       return '-'
"+"                       return '+'
"<"                       return '<'
"<="                      return '<='
">"                       return '>'
">="                      return '>='
"=="                      return '=='
"!="                      return '!='
"="                       return '='
";"                       return ';'
":"                       return ':'
","                       return ','
"."                       return '.'
<<EOF>>                   return 'EOF'
"!"                       return '!'
"%"                       return '%'
"&&"                      return '&&'
"||"                      return '||'
"("                       return '('
")"                       return ')'
"]"                       return ']'
"["                       return '['
"{"                       return '{'
"}"                       return '}'

/lex

%left '&&' '||'
%left '<' '<=' '>' '>=' '==' '!=' RELOP
%left '-' '+' ADDOP
%left '*' '/' '%' MULOP
%nonassoc INCR DECR
%nonassoc UMINUS NEGATION
%nonassoc IF_WITHOUT_ELSE
%nonassoc ELSE
%nonassoc CLASS_WITHOUT_EXTENDS
%nonassoc EXTENDS

%%

/**
 * TOP DEF
 */

Program
  : EOF
    {}
  | TopDefs EOF
    {return yy.state.rootScope;}
  ;

TopDefs
  : TopDef
    { yy.state.currentScope.addElement($TopDef) }
  | TopDefs TopDef
    { yy.state.currentScope.addElement($TopDef) }
  ;

TopDef
  : FunctionSignature Block
    {
      yy.state.currentFunction.loc = _$;
      yy.state.popFunction();
      yy.state.popScope(scope);

      $$ = $FunctionSignature;
    }
  | ClassSignature ClassBlock
  ;


/**
 * CLASS
 */

ClassSignature
  : CLASS IDENT %prec CLASS_WITHOUT_EXTENDS
  | CLASS IDENT EXTENDS IDENT
  ;

ClassBlock
  : '{' '}'
    {}
  | '{' ClassStms '}'
    {}
  ;

ClassStms
  : ClassStms ClassStm
  | ClassStm
  ;

ClassStm
 : Type Items ';'
 | FunctionSignature Block
 ;

/**
 * FUNCTION
 */

FunctionSignature
  : Type IDENT '(' Args ')'
    {
      var scope = yy.Scope.create({
        variables: $Args,
        parent: yy.state.currentScope
      });
      var fun = yy.Function.create({
        type: $Type,
        ident: $IDENT,
        args: $Args,
        scope: scope,
        parent: yy.state.currentScope
      });

      scope.function = fun;

      yy.state.pushFunction(fun);
      yy.state.pushScope(scope);

      $$ = fun;
    }
  ;

Args
  :
    {$$ = []}
  | Arg
    {$$ = [$Arg]}
  | Args ',' Arg
    {$Args.push($Arg); $$ = $Args;}
  ;

Arg
  : Type IDENT
    {$$ = yy.Argument.create({
      type: $Type,
      ident: $IDENT,
      loc: _$
    });}
  ;

Block
  : '{' '}'
    {}
  | '{' Stmts '}'
    {}
  ;

/**
 * STATEMENTS
 */

Stmts
  : Stmt
    {
      yy.state.currentScope.addElement($Stmt);
    }
  | Stmts Stmt
    {
      yy.state.currentScope.addElement($Stmt);
    }
  ;

Stmt
  : BlockInit Block
    {
      $$ = $BlockInit;
      yy.state.currentScope.loc = _$;
      yy.state.popScope(scope);
    }
  | IDENT Items ';'
    {
      $$ = $Items;
    }
  | IDENT ARRAY Items ';'
    {
      $$ = $Items;
    }
  | Ident '=' Expr ';'
    {
      $$ = yy.Statement.create('VARIABLE_ASSIGNMENT', {
        ident: $Ident,
        expr: $Expr,
        loc: _$
      });
    }
  | Ident INCR ';'
    {
      $$ = yy.Statement.create('VARIABLE_INCR', {
        ident: $Ident,
        loc: _$
      });
    }
  | Ident DECR ';'
    {
      $$ = yy.Statement.create('VARIABLE_DECR', {
        ident: $Ident,
        loc: _$
      });
    }
  | RETURN Expr ';'
    {
      {
        $$ = yy.Statement.create('RETURN', {
          expr: $Expr,
          loc: _$
        });
      }
    }
  | RETURN ';'
    {
      $$ = yy.Statement.create('RETURN', {
        loc: _$
      });
    }
  | IF '(' Expr ')' Stmt %prec IF_WITHOUT_ELSE
    {
      $$ = yy.Statement.create('IF', {
        expr: $Expr,
        right: $Stmt,
        loc: _$
      });
    }
  | IF '(' Expr ')' Stmt ELSE Stmt
    {
      $$ = yy.Statement.create('IF', {
        expr: $Expr,
        right: $Stmt1,
        wrong: $Stmt2,
        loc: _$
      });
    }
  | WHILE '(' Expr ')' Stmt
    {
      $$ = yy.Statement.create('WHILE', {
        expr: $Expr,
        stmt: $Stmt,
        loc: _$
      });
    }
  | FOR '(' IDENT IDENT ':' IDENT ')' Stmt
  | FOR '(' IDENT ':' IDENT ')' Stmt
  | Expr ';'
    { $$ = $Expr; }
  | ';'
    {$$ = undefined;}
  ;

// For block statements to create a scope
BlockInit
  :
    {
      var scope = yy.Scope.create({
        parent: yy.state.currentScope
      });

      yy.state.pushScope(scope);

      $$ = scope;
    }
  ;

// For function call
Items
  : Item
    {$$ = [$Item]}
  | Items ',' Item
    {
      $Items.push($Item);
      $$ = $Items;
    }
  ;

Item
  : IDENT
    {
      $$ = yy.Statement.create('VARIABLE_DECLARATION', {
        type: yy.state.declarationType,
        ident: $IDENT,
        loc: _$
      })
    }
  | IDENT '=' Expr
    {
      var decl = yy.Statement.create('VARIABLE_DECLARATION', {
        type: yy.state.declarationType,
        ident: $IDENT,
        loc: _$
      });
      var ass = yy.Statement.create('VARIABLE_ASSIGNMENT', {
        ident: $IDENT,
        expr: $Expr,
        loc: _$
      });
      $$ = [decl, ass];
    }
  ;

/**
 * EXPRESSIONS
 */

Exprs
  :
    { $$ = [] }
  | Expr
    { $$ = [$Expr]; }
  | Exprs ',' Expr
    {
      $Exprs.push($Expr);
      $$ = $Exprs;
    }
  ;

Expr
  : Number
    { $$ = $Number; }
  | String
    { $$ = $String; }
  | Logical
    { $$ = $Logical }
  | Ident
    {
      $$ = yy.Expression.create('VARIABLE', {
        ident: $Ident,
        loc: _$
      });
    }
  | Ident '(' Exprs ')'
    {
      $$ = yy.Expression.create('FUNCALL', {
        args: $Exprs,
        ident: $Ident,
        loc: _$
      });
    }
  | NEW IDENT '[' Expr ']'
    { }
  | NEW IDENT
    { }
  | '-' Expr %prec UMINUS
    {
      $$ = yy.Expression.create('UMINUS', {
        expr: $Expr,
        loc: _$
      });
    }
  | '!' Expr %prec NEGATION
    {
      $$ = yy.Expression.create('NEGATION', {
        expr: $Expr,
        loc: _$
      });
    }
  | Expr MulOp Expr %prec MULOP
    {
      $$ = yy.Expression.create('MULOP', {
        operator: $MulOp,
        left: $Expr1,
        right: $Expr2,
        loc: _$
      });
    }
  | Expr AddOp Expr %prec ADDOP
    {
      $$ = yy.Expression.create('ADDOP', {
        operator: $AddOp,
        left: $Expr1,
        right: $Expr2,
        loc: _$
      });
    }
  | Expr RelOp Expr %prec RELOP
    {
      $$ = yy.Expression.create('RELOP', {
        operator: $RelOp,
        left: $Expr1,
        right: $Expr2,
        loc: _$
      });
    }
  | Expr '&&' Expr
    {
      $$ = yy.Expression.create('LOGAND', {
        operator: '&&',
        left: $Expr1,
        right: $Expr2,
        loc: _$
      });
    }
  | Expr '||' Expr
    {
      $$ = yy.Expression.create('LOGOR', {
        operator: '||',
        left: $Expr1,
        right: $Expr2,
        loc: _$
      });
    }
  | '(' Expr ')'
    {$$ = $2}
  //| Cast Expr %prec CAST
  ;

Cast
  : '(' IDENT ')'
  ;

/**
 * TYPES, CONSTANTS AND OPERATORS
 */

Type
  : IDENT
    { }
  | IDENT ARRAY
    { }
  ;

Ident
  : IDENT
    {}
  | Ident '.' IDENT
    {}
  | Ident '[' Expr ']'
    {}
  ;

Number
  : NUMBER
    {
      $$ = yy.Expression.create('OBJECT', {
        type: 'int',
        value: Number(yytext),
        loc: _$
      });
    }
  ;

String
  : STRING_IDENT
    {
      $$ = yy.Expression.create('OBJECT', {
        type: 'string',
        value: String(yytext),
        loc: _$
      });
    }
  ;

Logical
  : TRUE
    {
      $$ = yy.Expression.create('OBJECT', {
        type: 'boolean',
        value: JSON.parse(yytext),
        loc: _$
      });
    }
  | FALSE
    {
      $$ = yy.Expression.create('OBJECT', {
        type: 'boolean',
        value: JSON.parse(yytext),
        loc: _$
      });
    }
  ;

AddOp
  : '+'
    {}
  | '-'
    {}
  ;

MulOp
  : '*'
    {}
  | '/'
    {}
  | '%'
    {}
  ;

RelOp
  : '<'
    {}
  | '<='
    {}
  | '>'
    {}
  | '>='
    {}
  | '=='
    {}
  | '!='
    {}
  ;
