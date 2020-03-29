grammar Java8;

// LEXER
ABSTRACT: 'abstract';
CLASS: 'class';

EXTENDS: 'extends';
IMPLEMENTS: 'implements';
PACKAGE: 'package';
PRIVATE: 'private';
PUBLIC: 'public';
PROTECTED: 'protected';
FINAL:              'final';


STATIC: 'static';

VOID: 'void';

IDENTIFIER: Letter LetterOrDigit*;

STRING_LITERAL: '"' (~["\\\r\n] | EscapeSequence)* '"';

fragment EscapeSequence
    : '\\' [btnfr"'\\]
    | '\\' ([0-3]? [0-7])? [0-7]
    | '\\' 'u'+ HexDigit HexDigit HexDigit HexDigit
    ;

fragment HexDigit
    : [0-9a-fA-F]
    ;


fragment LetterOrDigit
    : Letter
    | [0-9]
    ;

fragment Letter
    : [a-zA-Z$_] // these are the "java letters" below 0x7F
    | ~[\u0000-\u007F\uD800-\uDBFF] // covers all characters above 0x7F which are not a surrogate
    | [\uD800-\uDBFF] [\uDC00-\uDFFF] // covers UTF-16 surrogate pairs encodings for U+10000 to U+10FFFF
    ;

// PARSER

classDeclaration
     : CLASS IDENTIFIER typeParameters?
     //   (EXTENDS typeType)?
     //   (IMPLEMENTS typeList)?
       classBody
     ;

typeParameters
     : 

// typeParameter
//      : annotation* IDENTIFIER (EXTENDS typeBound)?

classBody
    : '{' classBodyDeclaration* '}'
    ;

classBodyDeclaration
    : ';'
    | STATIC? block
    | modifier* memberDeclaration
    ;

modifier
    : classOrInterfaceModifier
//     | NATIVE
//     | SYNCHRONIZED
//     | TRANSIENT
//     | VOLATILE
    ;

classOrInterfaceModifier:
//     : annotation
    | PUBLIC
    | PROTECTED
    | PRIVATE
    | STATIC
    | ABSTRACT
    | FINAL    // FINAL for class only -- does not apply to interfaces
//     | STRICTFP
    ;

// classBodyDeclaration
//     : ';'
//     | STATIC? block
//     | modifier* memberDeclaration
//     ;

// STATEMENTS / BLOCKS

block
    : '{' * '}'
    ;

// program: (std_expr | func_declaration | COMMENT)*;

// std_expr : var_assignment | const_assignment | func_call | assign_to_label;

// var_assignment : KW_LET LABEL OP_ASSIGN expr;
// const_assignment : KW_CONST LABEL OP_ASSIGN expr;

// assign_to_label : LABEL OP_ASSIGN expr;

// func_declaration : KW_FUNC LABEL L_BRACE std_expr* R_BRACE;
// func_call : LABEL L_PAR R_PAR
//           | LABEL L_PAR ((expr) ',')* (expr) R_PAR;

// expr : expr OP_POW expr
//      |  expr  (OP_MULTIPLY | OP_DIVIDE)  expr
//      |  expr  (OP_PLUS | OP_SUB) expr
//      |  L_PAR expr R_PAR
//      |  (OP_PLUS | OP_SUB)* NUM_LIT
//      | STR_LIT | func_call | LABEL;

// fragment DIGIT : [0-9]+ ;

// KW_LET   : 'let' ;
// KW_CONST : 'const' ;
// KW_IF    : 'if' ;
// KW_WHILE : 'while' ;
// KW_FUNC : 'func';

// OP_ASSIGN: '=' ;
// OP_PLUS: '+' ;
// OP_SUB: '-' ;
// OP_MULTIPLY: '*' ;
// OP_DIVIDE: '\\' ;
// OP_POW: '^^' ;
// OP_INCREMENT: '++' ;
// OP_DECREMENT: '--' ;

// L_BRACE : '{';
// R_BRACE : '}';
// L_PAR: '(';
// R_PAR: ')';

// LABEL : [a-zA-Z] ([a-zA-Z_] | DIGIT)* ;

// STR_LIT : '"'.*?'"' ;
// NUM_LIT : DIGIT+ 
//                 | DIGIT+ '.' DIGIT+
//                 | '-' DIGIT+
//                 | '-' DIGIT+ '.' DIGIT+
//                 ; 

// COMMENT  :  '$' ~( '\r' | '\n' )* -> skip;
// WS : [ \t]+ -> skip;
// EOL : '\r'? '\n' -> skip;