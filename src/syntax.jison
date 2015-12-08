/* Latte language parser */

/* lexical grammar */
%lex

%%
\s+   /* skip whitespace */

"if" return 'IF';
"else" return 'ELSE';
"while" return 'WHILE';

"void"                  return 'VOID';
"int"                   return 'INTEGER';
"string"                return 'STRING';
"boolean"               return 'BOOLEAN';

"true"                  return 'TRUE';
"false"                 return 'FALSE';

[0-9]+                  return 'NUMBER';
[a-zA-Z_][0-9a-zA-Z_]*  return 'LITERAL';

"++"                    return 'INCR';
"--"                    return 'DECT';

"-"                     return '-';
"+"                     return '+';

"*"                     return '*';
"/"                     return '/';
"%"                     return '%';

"="                     return '=';
"<"                     return '<';
"<="                    return '<=';
">"                     return '>';
">="                    return '>=';
"=="                    return '==';
"!="                    return '!=';

";"                     return ';';
","                     return ',';

"!"                     return '!';

"&&"                    return '&&';
"||"                    return '||';

"("                     return '(';
")"                     return ')';
"]"                     return ']';
"["                     return '[';
"{"                     return '{';
"}"                     return '}';

"$"                     return 'EOF';

/lex

/* operator associations and precedence */

%left '&&' '||'
%left '<', '<=', '>', '>=', '==', '!=', RELOP
%left '-', '+', ADDOP
%left '*', '/', '%', MULOP
%nonassoc UMINUS, NEGATION
%nonassoc INCR, DECR
%nonassoc IF_WITHOUT_ELSE
%nonassoc ELSE

/* language grammar */
%start Program

%%

Program
  : TopDefs EOF
    {return yy.data;}
  ;

TopDefs
  : TopDef
    {}
  | TopDefs TopDef
    {}
  ;

TopDef
  : Type Ident ( Args ) Block
    {}
  ;

Args
  : Arg
    {}
  | Args , Arg
    {}
  ;

Arg
  : Type Ident
    {}
  ;

Block
  : '{' Stmts '}'
    {}
  ;

Stmts
  : Stmt
    {}
  | Stmts ';' Stmt
    {}
  ;

Stmt
  : ';'
    {}
  | Block
    {}
  | Type Items ';'
    {}
  | Ident '=' Expr';'
    {}
  | Ident INCR ';'
    {}
  | Ident DECR ';'
    {}
  | INCR Ident ';'
    {}
  | DECR Ident ';'
    {}
  | return Expr ';'
    {}
  | return ';'
    {}
  | IF '(' Expr ')' Stmt %prec IF_WITHOUT_ELSE
    {}
  | IF '(' Expr ')' Stmt ELSE Stmt
    {}
  | WHILE '(' Expr ')' Stmt
    {}
  | Expr ';'
    {}
  ;

Items
  : Item
    {}
  | Items ',' Item
    {}
  ;

Item
  : Ident
    {}
  | Ident '=' Expr
    {}
  ;

Type
  : INTEGER
    {}
  | STRING
    {}
  | BOOLEAN
    {}
  | VOID
    {}
  ;

Ident
  : LITERAL
    {}
  ;

Exprs
  : Expr
    {}
  | Exprs ',' Expr
    {}
  ;

Expr
  : Ident
    {}
  | NUMBER
    {}
  | TRUE
    {}
  | FALSE
    {}
  | Ident '(' Exprs ')'
    {}
  | '-'' Expr
    {}
  | '!'' Expr
    {}
  | Expr MulOp Expr
    {}
  | Expr AddOp Expr
    {}
  | Expr RelOp Expr
    {}
  | Expr && Expr
    {}
  | Expr '||'' Expr
    {}
  | '(' Expr ')'
    {}
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
