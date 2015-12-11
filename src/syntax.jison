
/* description: Latte language parser */

%lex

%%
\s+                       /* skip whitespace */
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
"="                       return '='
"<"                       return '<'
"<="                      return '<='
">"                       return '>'
">="                      return '>='
"=="                      return '=='
"!="                      return '!='
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
    {}
  | TopDefs TopDef
    {}
  ;

TopDef
  : FunctionSignature Block
    {
      yy.state.currentFunction.location = _$;
      yy.state.popFunction(fun);
      yy.state.popScope(scope);
    }
  ;

FunctionSignature
  : Type Ident '(' Args ')'
    {
      var scope = yy.Scope.create({
        vars: $Args,
        parent: yy.state.currentScope
      });
      var fun = yy.Function.create({
        type: $Type,
        ident: $Ident,
        args: $Args,
        scope: scope
      });
      yy.state.currentScope.addFunction(fun);
      yy.state.pushFunction(fun);
      yy.state.pushScope(scope);
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
    {$$ = yy.Variable.create({
      type: $Type,
      ident: $Ident
    });}
  ;

Block
  : '{' Stmts '}'
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
      yy.state.popScope(scope);
    }
  | Type Items ';'
    {
      $$ = $Items;
    }
  | Ident '=' Expr ';'
    {
      $$ = yy.Statement.create({
        type: 'VARIABLE_ASSIGNMENT',
        ident: $Ident,
        value: $Expr
      });
    }
  | Ident INCR ';'
    {
      $$ = yy.Statement.create({
        type: 'VARIABLE_INCR',
        ident: $Ident
      });
    }
  | Ident DECR ';'
    {
      $$ = yy.Statement.create({
        type: 'VARIABLE_DECR',
        ident: $Ident
      });
    }
  | RETURN Expr ';'
    {
      {
        $$ = yy.Statement.create({
          type: 'RETURN',
          value: $Expr
        });
      }
    }
  | RETURN ';'
    {
      $$ = yy.Statement.create({
        type: 'RETURN'
      });
    }
  | IF '(' Expr ')' Stmt %prec IF_WITHOUT_ELSE
    {
      $$ = yy.Statement.create({
        type: 'IF',
        expr: $Expr,
        right: $Stmt
      });
    }
  | IF '(' Expr ')' Stmt ELSE Stmt
    {
      $$ = yy.Statement.create({
        type: 'IF',
        expr: $Expr,
        right: $Stmt1,
        wrong: $Stmt2
      });
    }
  | WHILE '(' Expr ')' Stmt
    {
      $$ = yy.Statement.create({
        type: 'WHILE',
        expr: $Expr,
        stmt: $Stmt
      });
    }
  | Expr ';'
    { $$ = $Expr; }
  | ';'
    {}
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
      $$ = yy.Statement.create({
        type: 'VARIABLE_DECLARATION',
        varType: yy.state.declarationType,
        ident: $Ident
      })
    }
  | Ident '=' Expr
    {
      var decl = yy.Statement.create({
        type: 'VARIABLE_DECLARATION',
        varType: yy.state.declarationType,
        ident: $Ident
      });
      var ass = yy.Statement.create({
        type: 'VARIABLE_ASSIGNMENT',
        ident: $Ident,
        value: $Expr
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
  : Expr
    { $$ = [$Expr]; }
  | Exprs ',' Expr
    {
      $Exprs.push($Expr);
      $$ = $Exprs;
    }
  ;

Expr
  : Ident
    { $$ = $Ident; }
  | Number
    { $$ = $Number; }
  | String
    { $$ = $String; }
  | Logical
    { $$ = $Logical }
  | Ident '(' Exprs ')'
    {
      $$ = yy.Expression.create({
        type: 'FUNCALL',
        args: $Exprs,
        ident: $Ident
      });
    }
  | '-' Expr %prec UMINUS
    {
      $$ = yy.Expression.create({
        type: 'UMINUS',
        value: $Expr
      });
    }
  | '!' Expr %prec NEGATION
    {
      $$ = yy.Expression.create({
        type: 'NEGATION',
        value: $Expr
      });
    }
  | Expr MulOp Expr %prec MULOP
    {
      $$ = yy.Expression.create({
        type: 'MULOP',
        operator: $MulOp,
        left: $Expr1,
        right: $Expr2
      });
    }
  | Expr AddOp Expr %prec ADDOP
    {
      $$ = yy.Expression.create({
        type: 'ADDOP',
        operator: $AddOp,
        left: $Expr1,
        right: $Expr2
      });
    }
  | Expr RelOp Expr %prec RELOP
    {
      $$ = yy.Expression.create({
        type: 'RELOP',
        operator: $RelOp,
        left: $Expr1,
        right: $Expr2
      });
    }
  | Expr '&&' Expr
    {
      $$ = yy.Expression.create({
        type: 'LOGAND',
        operator: '&&',
        left: $Expr1,
        right: $Expr2
      });
    }
  | Expr '||' Expr
    {
      $$ = yy.Expression.create({
        type: 'LOGOR',
        operator: '||',
        left: $Expr1,
        right: $Expr2
      });
    }
  | '(' Expr ')'
    {$$ = $2}
  ;

Number
  : NUMBER
    {
      console.log('number');
      $$ = yy.Expression.create({
        type: 'OBJECT',
        varType: 'int',
        value: Number(yytext)
      });
    }
  ;

String
  : STRING_LITERAL
    {
      console.log('str');
      $$ = yy.Expression.create({
        type: 'OBJECT',
        varType: 'string',
        value: String(yytext)
      });
    }
  ;

Logical
  : TRUE
    {
      $$ = yy.Expression.create({
        type: 'OBJECT',
        varType: 'boolean',
        value: JSON.parse(yytext)
      });
    }
  | FALSE
    {
      $$ = yy.Expression.create({
        type: 'OBJECT',
        varType: 'boolean',
        value: JSON.parse(yytext)
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
