
/* description: Latte language parser */

%lex

%%
\s+                       /* skip whitespace */
"//".*                    /* skip line comments */
"#".*                    /* skip hash line comments */
"/*"((\*+[^/*])|([^*]))*\**"*/" /* skip block comments */

null                      return 'NULL'
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
    {
      $$ = yy.Statements.DeclarationClass.create({
        block: $ClassBlock,
        name: $IDENT,
        loc: _$
      });
    }
  | CLASS IDENT EXTENDS IDENT ClassBlock
    {
      $$ = yy.Statements.DeclarationClass.create({
        block: $ClassBlock,
        name: $IDENT1,
        extends: $IDENT2,
        loc: _$
      });
    }
  ;

ClassBlock
  : '{' '}'
    { $$ = yy.Block.create(); }
  | '{' ClassStms '}'
    { $$ = yy.Block.create($ClassStms); }
  ;

ClassStms
  : ClassStm
    { $$ = [$ClassStm]; }
  | ClassStms ClassStm
    { $$ = $ClassStms.concat([$ClassStm]); }
  ;

ClassStm
 : IDENT Items ';'
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
        item.array = true;
      });

      $$ = $Items;
    }
 | FunctionDecl
   { $$ = $FunctionDecl; }
 ;

/**
 * FUNCTION
 */

FunctionDecl
  : IDENT IDENT '(' Args ')' Block
    {
      $$ = yy.Statements.DeclarationFunction.create({
        args: $Args,
        block: $Block,
        type: $IDENT1,
        ident: $IDENT2,
        loc: _$
      });
    }
  | IDENT ARRAY IDENT '(' Args ')' Block
    {
      $$ = yy.Statements.DeclarationFunction.create({
        args: $Args,
        block: $Block,
        type: $IDENT1,
        array: true,
        ident: $IDENT2,
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
  : IDENT IDENT
    {
      $$ = yy.Argument.create({
        type: $IDENT1,
        ident: $IDENT2,
        loc: _$
      });
    }
  | IDENT ARRAY IDENT
    {
      $$ = yy.Argument.create({
        type: $IDENT1,
        array: true,
        ident: $IDENT2,
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
      $$ = yy.Statements.Block.create({
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
        item.array = true;
      });

      $$ = $Items;
    }
  | Ident '=' Expr ';'
    {
      $$ = yy.Statements.Assignment.create({
        ident: $Ident,
        expr: $Expr,
        loc: _$
      });
    }
  | Ident INCR ';'
    {
      $$ = yy.Statements.Incr.create({
        ident: $Ident,
        loc: _$
      });
    }
  | Ident DECR ';'
    {
      $$ = yy.Statements.Decr.create({
        ident: $Ident,
        loc: _$
      });
    }
  | RETURN Expr ';'
    {
      {
        $$ = yy.Statements.Return.create({
          expr: $Expr,
          loc: _$
        });
      }
    }
  | RETURN ';'
    {
      $$ = yy.Statements.Return.create({
        loc: _$
      });
    }
  | IF '(' Expr ')' Stmt %prec IF_WITHOUT_ELSE
    {
      $$ = yy.Statements.If.create({
        cond: $Expr,
        right: $Stmt,
        loc: _$
      });
    }
  | IF '(' Expr ')' Stmt ELSE Stmt
    {
      $$ = yy.Statements.If.create({
        cond: $Expr,
        right: $Stmt1,
        wrong: $Stmt2,
        loc: _$
      });
    }
  | WHILE '(' Expr ')' Stmt
    {
      $$ = yy.Statements.While.create({
        cond: $Expr,
        loop: $Stmt,
        loc: _$
      });
    }
  | FOR '(' IDENT IDENT ':' IDENT ')' Stmt
    {
      $$ = yy.Statements.For.create({
        decl: true,
        type: $IDENT1,
        ident: $IDENT2,
        array: $IDENT3,
        loop: $Stmt,
        loc: _$
      });
    }
  | FOR '(' IDENT ':' IDENT ')' Stmt
    {
      $$ = yy.Statements.For.create({
        decl: false,
        ident: $IDENT1,
        array: $IDENT2,
        loop: $Stmt,
        loc: _$
      });
    }
  | Expr ';'
    {
      $$ = yy.Statements.Expression.create({
        expr: $Expr
      });
    }
  | ';'
    { $$ = yy.Statements.Noop.create({
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
      $$ = yy.Statements.DeclarationVariable.create({
        ident: $IDENT,
        loc: _$
      });
    }
  | IDENT '=' Expr
    {
      $$ = yy.Statements.DeclarationVariable.create({
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
  | Array
    { $$ = $Array; }
  | Class
    { $$ = $Class  }
  | NULL
    { $$ = yy.Expressions.Null.create(); }
  | Ident
    {
      $$ = yy.Expressions.Variable.create({
        ident: $Ident,
        loc: _$
      });
    }
  | Ident '(' Exprs ')'
    {
      $$ = yy.Expressions.Funcall.create({
        args: $Exprs,
        ident: $Ident,
        loc: _$
      });
    }
  | '-' Expr %prec UMINUS
    {
      $$ = yy.Expressions.Uminus.create({
        expr: $Expr,
        loc: _$
      });
    }
  | '!' Expr %prec NEGATION
    {
      $$ = yy.Expressions.Negation.create({
        expr: $Expr,
        loc: _$
      });
    }
  | Expr MulOp Expr %prec MULOP
    {
      $$ = yy.Expressions.Operation.create({
        operator: $MulOp,
        left: $Expr1,
        right: $Expr2,
        loc: _$
      });
    }
  | Expr AddOp Expr %prec ADDOP
    {
      $$ = yy.Expressions.Operation.create({
        operator: $AddOp,
        left: $Expr1,
        right: $Expr2,
        loc: _$
      });
    }
  | Expr RelOp Expr %prec RELOP
    {
      $$ = yy.Expressions.Comparison.create({
        operator: $RelOp,
        left: $Expr1,
        right: $Expr2,
        loc: _$
      });
    }
  | Expr LogOp Expr %prec LOGOP
    {
      $$ = yy.Expressions.Logical.create({
        operator: $LogOp,
        left: $Expr1,
        right: $Expr2,
        loc: _$
      });
    }
  | '(' Expr ')'
    {
      $$ = yy.Expressions.Parenthesis.create({
        expr: $Expr
      });
    }
  ;

/**
 * TYPES, CONSTANTS AND OPERATORS
 */

Array
 : NEW IDENT '[' Expr ']'
    { $$ = yy.Expressions.Object.create({
        type: $IDENT,
        array: true,
        expr: $Expr,
        loc: _$
      });
    }
 ;

Class
  : NEW IDENT
    { }
  ;
Ident
  : IDENT
    { $$ = yy.Idents.Variable.create({
        text: $IDENT,
        loc: _$
      });
    }
  | Ident '.' IDENT
    { $$ = yy.Idents.Property.create({
        ident: $IDENT,
        source: $Ident,
        loc: _$
      });
    }
  | Ident '[' Expr ']'
    { $$ = yy.Idents.Element.create({
        expr: $Expr,
        source: $Ident,
        loc: _$
      });
    }
  ;

Number
  : NUMBER
    {
      $$ = yy.Expressions.Object.create({
        type: 'int',
        text: Number(yytext),
        loc: _$
      });
    }
  ;

String
  : STRING_IDENT
    {
      $$ = yy.Expressions.Object.create({
        type: 'string',
        text: String(yytext),
        loc: _$
      });
    }
  ;

Logical
  : LogVal
    {
      $$ = yy.Expressions.Object.create({
        type: 'boolean',
        text: JSON.parse($LogVal),
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
