
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
int                       return 'INTEGER'
string                    return 'STRING'
boolean                   return 'BOOLEAN'
void                      return 'VOID'
return                    return 'RETURN'
[0-9]+                    return 'NUMBER'
[a-zA-Z_][0-9a-zA-Z_]*    return 'LITERAL'
L?\"(\\.|[^\\"])*\"       return 'STRING_LITERAL'
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
","                       return ','
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

%%

Program
  : TopDefs EOF
    {return yy.state.mainScope;}
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
      yy.state.currentFunction.location = _$[_$.length-1];
      yy.state.popFunction();
      yy.state.popScope(scope);

      $$ = $FunctionSignature;
    }
  ;

FunctionSignature
  : Type Ident '(' Args ')'
    {
      var scope = yy.Scope.create({
        variables: $Args,
        parent: yy.state.currentScope
      });
      var fun = yy.Function.create({
        type: $Type,
        ident: $Ident,
        args: $Args,
        scope: scope,
        parent: yy.state.currentScope
      });
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
  : Type Ident
    {$$ = yy.Argument.create({
      type: $Type,
      ident: $Ident,
      loc: _$[_$.length-1]
    });}
  ;

Block
  : '{' Stmts '}'
    {}
  | '{' '}'
    {}
  ;

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
      yy.state.currentScope.location = _$[_$.length-1];
      yy.state.popScope(scope);
    }
  | Type Items ';'
    {
      $$ = $Items;
    }
  | Ident '=' Expr ';'
    {
      $$ = yy.Statement.create('VARIABLE_ASSIGNMENT', {
        ident: $Ident,
        expr: $Expr,
        loc: _$[_$.length-4]
      });
    }
  | Ident INCR ';'
    {
      $$ = yy.Statement.create('VARIABLE_INCR', {
        ident: $Ident,
        loc: _$[_$.length-1]
      });
    }
  | Ident DECR ';'
    {
      $$ = yy.Statement.create('VARIABLE_DECR', {
        ident: $Ident,
      loc: _$[_$.length-1]
      });
    }
  | RETURN Expr ';'
    {
      {
        $$ = yy.Statement.create('RETURN', {
          expr: $Expr,
          loc: _$[_$.length-1]
        });
      }
    }
  | RETURN ';'
    {
      $$ = yy.Statement.create('RETURN', {
        loc: _$[_$.length-1]
      });
    }
  | IF '(' Expr ')' Stmt %prec IF_WITHOUT_ELSE
    {
      $$ = yy.Statement.create('IF', {
        expr: $Expr,
        right: $Stmt,
        loc: _$[_$.length-3]
      });
    }
  | IF '(' Expr ')' Stmt ELSE Stmt
    {
      $$ = yy.Statement.create('IF', {
        expr: $Expr,
        right: $Stmt1,
        wrong: $Stmt2,
        loc: _$[_$.length-1]
      });
    }
  | WHILE '(' Expr ')' Stmt
    {
      $$ = yy.Statement.create('WHILE', {
        expr: $Expr,
        stmt: $Stmt,
        loc: _$[_$.length-1]
      });
    }
  | Expr ';'
    { $$ = $Expr; }
  | ';'
    {$$ = undefined;}
  ;

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
  : Ident
    {
      $$ = yy.Statement.create('VARIABLE_DECLARATION', {
        type: yy.state.declarationType,
        ident: $Ident,
        loc: _$[_$.length-1]
      })
    }
  | Ident '=' Expr
    {
      var decl = yy.Statement.create('VARIABLE_DECLARATION', {
        type: yy.state.declarationType,
        ident: $Ident,
        loc: _$[_$.length-1]
      });
      var ass = yy.Statement.create('VARIABLE_ASSIGNMENT', {
        ident: $Ident,
        expr: $Expr,
        loc: _$[_$.length-1]
      });
      $$ = [decl, ass];
    }
  ;

Type
  : INTEGER
    {
      yy.state.declarationType = $1;
    }
  | STRING
    {
      yy.state.declarationType = $1;
    }
  | BOOLEAN
    {
      yy.state.declarationType = $1;
    }
  | VOID
    {
      yy.state.declarationType = $1;
    }
  ;

Ident
  : LITERAL
    { $$ = String(yytext); }
  ;

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
        loc: _$[_$.length-1]
      });
    }
  | Ident '(' Exprs ')'
    {
      $$ = yy.Expression.create('FUNCALL', {
        args: $Exprs,
        ident: $Ident,
        loc: _$[_$.length-4]
      });
    }
  | '-' Expr %prec UMINUS
    {
      $$ = yy.Expression.create('UMINUS', {
        expr: $Expr,
        loc: _$[_$.length-1]
      });
    }
  | '!' Expr %prec NEGATION
    {
      $$ = yy.Expression.create('NEGATION', {
        expr: $Expr,
        loc: _$[_$.length-1]
      });
    }
  | Expr MulOp Expr %prec MULOP
    {
      $$ = yy.Expression.create('MULOP', {
        operator: $MulOp,
        left: $Expr1,
        right: $Expr2,
        loc: _$[_$.length-1]
      });
    }
  | Expr AddOp Expr %prec ADDOP
    {
      $$ = yy.Expression.create('ADDOP', {
        operator: $AddOp,
        left: $Expr1,
        right: $Expr2,
        loc: _$[_$.length-1]
      });
    }
  | Expr RelOp Expr %prec RELOP
    {
      $$ = yy.Expression.create('RELOP', {
        operator: $RelOp,
        left: $Expr1,
        right: $Expr2,
        loc: _$[_$.length-1]
      });
    }
  | Expr '&&' Expr
    {
      $$ = yy.Expression.create('LOGAND', {
        operator: '&&',
        left: $Expr1,
        right: $Expr2,
        loc: _$[_$.length-1]
      });
    }
  | Expr '||' Expr
    {
      $$ = yy.Expression.create('LOGOR', {
        operator: '||',
        left: $Expr1,
        right: $Expr2,
        loc: _$[_$.length-1]
      });
    }
  | '(' Expr ')'
    {$$ = $2}
  ;

Number
  : NUMBER
    {
      $$ = yy.Expression.create('OBJECT', {
        type: 'int',
        value: Number(yytext),
        loc: _$[_$.length-1]
      });
    }
  ;

String
  : STRING_LITERAL
    {
      $$ = yy.Expression.create('OBJECT', {
        type: 'string',
        value: String(yytext),
        loc: _$[_$.length-1]
      });
    }
  ;

Logical
  : TRUE
    {
      $$ = yy.Expression.create('OBJECT', {
        type: 'boolean',
        value: JSON.parse(yytext),
        loc: _$[_$.length-1]
      });
    }
  | FALSE
    {
      $$ = yy.Expression.create('OBJECT', {
        type: 'boolean',
        value: JSON.parse(yytext),
        loc: _$[_$.length-1]
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