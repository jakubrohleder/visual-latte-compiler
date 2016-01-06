
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
"<="                      return '<='
"<"                       return '<'
">="                      return '>='
">"                       return '>'
"=="                      return '=='
"!="                      return '!='
"="                       return '='
";"                       return ';'
":"                       return ':'
","                       return ','
"."                       return '.'
<<EOF>>                   return 'EOF'
"%"                       return '%'
"!"                       return '!'
"&&"                      return '&&'
"||"                      return '||'
"("                       return '('
")"                       return ')'
"]"                       return ']'
"["                       return '['
"{"                       return '{'
"}"                       return '}'

/lex

%left '&&' '||' LOGOP
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
    { return yy.Block.create($TopDefs); }
  ;

TopDefs
  : TopDef
    { $$ = [$TopDef]; }
  | TopDefs TopDef
    { $$ = $TopDefs.concat([$TopDef]); }
  ;

TopDef
  : FunctionDecl
    { $$ = $FunctionDecl; }
  | ClassDecl
    { $$ = $ClassDecl; }
  ;


/**
 * CLASS
 */

ClassDecl
  : CLASS IDENT ClassBlock %prec CLASS_WITHOUT_EXTENDS
  | CLASS IDENT EXTENDS IDENT ClassBlock
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
 | FunctionDecl
 ;

/**
 * FUNCTION
 */

FunctionDecl
  : Type IDENT '(' Args ')' Block
    {
      $$ = yy.Statement.DeclarationFunction.create({
        args: $Args,
        block: $Block,
        type: $Type,
        ident: $IDENT,
        loc: _$
      });
    }
  ;

Args
  :
    { $$ = []; }
  | Arg
    { $$ = [$Arg]; }
  | Args ',' Arg
    { $$ = $Args.concat([$Arg]); }
  ;

Arg
  : Type IDENT
    {
      $$ = yy.Argument.create({
        type: $Type,
        ident: $IDENT,
        loc: _$
      });
    }
  ;

Block
  : '{' '}'
    {
      $$ = yy.Block.create();
    }
  | '{' Stmts '}'
    {
      $$ = yy.Block.create($Stmts);
    }
  ;

/**
 * STATEMENTS
 */

Stmts
  : Stmt
    { $$ = [$Stmt]; }
  | Stmts Stmt
    {
      $$ = $Stmts.concat([$Stmt]);
    }
  ;

Stmt
  : Block
    {
      $$ = yy.Statement.Block.create({
        block: $Block,
        loc: _$
      });
    }

  //Due to bug in jison
  | IDENT Items ';'
    {
      var items = yy._.flattenDeep($Items);
      items.map(function(item) {
        item.type = item.type === undefined ? String($IDENT) : item.type;
      });

      $$ = items;
    }
  | IDENT ARRAY Items ';'
    {
      $Items.map(function(item) {
        item.type = String($IDENT);
      });

      $$ = $Items;
    }


  | Ident '=' Expr ';'
    {
      $$ = yy.Statement.Assignment.create({
        ident: $Ident,
        expr: $Expr,
        loc: _$
      });
    }
  | Ident INCR ';'
    {
      $$ = yy.Statement.Incr.create({
        ident: $Ident,
        loc: _$
      });
    }
  | Ident DECR ';'
    {
      $$ = yy.Statement.Decr.create({
        ident: $Ident,
        loc: _$
      });
    }
  | RETURN Expr ';'
    {
      {
        $$ = yy.Statement.Return.create({
          expr: $Expr,
          loc: _$
        });
      }
    }
  | RETURN ';'
    {
      $$ = yy.Statement.Return.create({
        loc: _$
      });
    }
  | IF '(' Expr ')' Stmt %prec IF_WITHOUT_ELSE
    {
      $$ = yy.Statement.If.create({
        cond: $Expr,
        right: $Stmt,
        loc: _$
      });
    }
  | IF '(' Expr ')' Stmt ELSE Stmt
    {
      $$ = yy.Statement.If.create({
        cond: $Expr,
        right: $Stmt1,
        wrong: $Stmt2,
        loc: _$
      });
    }
  | WHILE '(' Expr ')' Stmt
    {
      $$ = yy.Statement.While.create({
        cond: $Expr,
        loop: $Stmt,
        loc: _$
      });
    }
  | FOR '(' IDENT IDENT ':' IDENT ')' Stmt
  | FOR '(' IDENT ':' IDENT ')' Stmt
  | Expr ';'
    { $$ = $Expr; }
  | ';'
    { $$ = yy.Statement.Noop.create({
      loc: _$
    }); }
  ;

Items
  : Item
    { $$ = [$Item]; }
  | Items ',' Item
    { $$ = $Items.concat([$Item]); }
  ;

Item
  : IDENT
    {
      $$ = yy.Statement.DeclarationVariable.create({
        ident: $IDENT,
        loc: _$
      });
    }
  | IDENT '=' Expr
    {
      $$ = yy.Statement.DeclarationVariable.create({
        ident: $IDENT,
        expr: $Expr,
        loc: _$
      });
    }
  ;

/**
 * EXPRESSIONS
 */

Exprs
  :
    { $$ = []; }
  | Expr
    { $$ = [$Expr]; }
  | Exprs ',' Expr
    { $$ = $Exprs.concat([$Expr]); }
  ;

Expr
  : Number
    { $$ = $Number; }
  | String
    { $$ = $String; }
  | Logical
    { $$ = $Logical; }
  | Ident
    {
      $$ = yy.Expression.Variable.create({
        ident: $Ident,
        loc: _$
      });
    }
  | Ident '(' Exprs ')'
    {
      $$ = yy.Expression.Funcall.create({
        args: $Exprs,
        ident: $Ident,
        loc: _$
      });
    }
  | NEW IDENT '[' Expr ']'
    { console.log('undefined NEW IDENT [ Expr ]'); }
  | NEW IDENT
    { console.log('undefined NEW IDENT ');  }
  | '-' Expr %prec UMINUS
    {
      $$ = yy.Expression.Uminus.create({
        expr: $Expr,
        loc: _$
      });
    }
  | '!' Expr %prec NEGATION
    {
      $$ = yy.Expression.Negation.create({
        expr: $Expr,
        loc: _$
      });
    }
  | Expr MulOp Expr %prec MULOP
    {
      $$ = yy.Expression.Operation.create({
        operator: $MulOp,
        left: $Expr1,
        right: $Expr2,
        loc: _$
      });
    }
  | Expr AddOp Expr %prec ADDOP
    {
      $$ = yy.Expression.Operation.create({
        operator: $AddOp,
        left: $Expr1,
        right: $Expr2,
        loc: _$
      });
    }
  | Expr RelOp Expr %prec RELOP
    {
      $$ = yy.Expression.Comparison.create({
        operator: $RelOp,
        left: $Expr1,
        right: $Expr2,
        loc: _$
      });
    }
  | Expr LogOp Expr %prec LOGOP
    {
      $$ = yy.Expression.Logical.create({
        operator: $LogOp,
        left: $Expr1,
        right: $Expr2,
        loc: _$
      });
    }
  | '(' Expr ')'
    {
      $$ = yy.Expression.Parenthesis.create({
        expr: $Expr
      });
    }
  ;

/**
 * TYPES, CONSTANTS AND OPERATORS
 */

Type
  : IDENT
    { $$ = String($IDENT); }
  | IDENT ARRAY
    { $$ = String($IDENT); }
  ;

Ident
  : IDENT
    { $$ = $IDENT; }
  | Ident '.' IDENT
    { console.log('undefined Ident . IDENT'); }
  | Ident '[' Expr ']'
    { console.log('undefined Ident [ Expr ]'); }
  ;

Number
  : NUMBER
    {
      $$ = yy.Expression.Object.create({
        type: 'int',
        value: Number(yytext),
        loc: _$
      });
    }
  ;

String
  : STRING_IDENT
    {
      $$ = yy.Expression.Object.create({
        type: 'string',
        value: String(yytext),
        loc: _$
      });
    }
  ;

Logical
  : LogVal
    {
      $$ = yy.Expression.Object.create({
        type: 'boolean',
        value: JSON.parse($LogVal),
        loc: _$
      });
    }
  ;

LogVal
  : TRUE
  | FALSE
  ;

LogOp
  : '&&'
  | '||'
  ;

AddOp
  : '+'
  | '-'
  ;

MulOp
  : '*'
  | '/'
  | '%'
  ;

RelOp
  : '<'
  | '<='
  | '>'
  | '>='
  | '=='
  | '!='
  ;
