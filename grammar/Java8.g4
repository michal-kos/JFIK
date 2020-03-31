grammar Java8;

// LEXER
ABSTRACT: 'abstract';
ASSERT: 'assert';
BOOLEAN: 'boolean';
BREAK: 'break';
CHAR: 'char';
CONTINUE: 'continue';
BYTE: 'byte';
DOUBLE: 'double';
FLOAT: 'float';
SHORT: 'short';
INT: 'int';
FOR: 'for';
WHILE: 'while';
IF: 'if';
LONG: 'long';
IMPORT: 'import';
DO: 'do';

CLASS: 'class';

EXTENDS: 'extends';
IMPLEMENTS: 'implements';
PACKAGE: 'package';
PRIVATE: 'private';
PUBLIC: 'public';
PROTECTED: 'protected';
FINAL: 'final';
TRY: 'try';
SWITCH: 'switch';
SYNCHRONIZED: 'synchronized';
RETURN: 'return';
THROW: 'throw';
THROWS: 'throws';
STATIC: 'static';

VOID: 'void';

IDENTIFIER: Letter LetterOrDigit*;

// STRING_LITERAL: '"' (~["\\\r\n] | EscapeSequence)* '"';

// fragment EscapeSequence: '\\' [btnfr"'\\] | '\\' ([0-3]? [0-7])? [0-7] | '\\' 'u'+ HexDigit
// HexDigit HexDigit HexDigit;

// fragment HexDigit: [0-9a-fA-F];

fragment LetterOrDigit: Letter | [0-9];

fragment Letter:
	[a-zA-Z$_] // these are the "java letters" below 0x7F
	| ~[\u0000-\u007F\uD800-\uDBFF] // covers all characters above 0x7F which are not a surrogate
	| [\uD800-\uDBFF] [\uDC00-\uDFFF];
	// covers UTF-16 surrogate pairs encodings for U+10000 to U+10FFFF

// PARSER

importDeclaration: IMPORT STATIC? qualifiedName ('.' '*')? ';';

qualifiedName: IDENTIFIER ('.' IDENTIFIER)*;

typeDeclaration:
	classOrInterfaceModifier classDeclaration
	| ';';
//  (classDeclaration | enumDeclaration | interfaceDeclaration | annotationTypeDeclaration)

classDeclaration:
	CLASS IDENTIFIER typeParameters? (EXTENDS typeType)? (
		IMPLEMENTS typeList
	)? classBody;

typeParameters: '<' typeParameter (',' typeParameter)* '>';

typeParameter: IDENTIFIER (EXTENDS typeBound)?;
// typeParameter: annotation* IDENTIFIER (EXTENDS typeBound)?;

typeBound: typeType ('&' typeType)*;

typeType: primitiveType;
// 	// annotation? (classOrInterfaceType | primitiveType) ('[' ']')*;

typeList: typeType (',' typeType)*;

primitiveType:
	BOOLEAN
	| CHAR
	| BYTE
	| SHORT
	| INT
	| LONG
	| FLOAT
	| DOUBLE;

classBody: '{' classBodyDeclaration* '}';

classBodyDeclaration:
	';'
	| STATIC? block
	| modifier* memberDeclaration;

memberDeclaration
    :
// : methodDeclaration | genericMethodDeclaration | fieldDeclaration | constructorDeclaration |
// genericConstructorDeclaration | interfaceDeclaration | annotationTypeDeclaration:
	classDeclaration
	; // | enumDeclaration

modifier: classOrInterfaceModifier;
// | NATIVE | SYNCHRONIZED | TRANSIENT | VOLATILE;

classOrInterfaceModifier:
	//     : annotation
	| PUBLIC
	| PROTECTED
	| PRIVATE
	| STATIC
	| ABSTRACT
	| FINAL ; //     | STRICTFP

// // classBodyDeclaration : ';' | STATIC? block | modifier* memberDeclaration ;

// // STATEMENTS / BLOCKS

block: '{' blockStatement* '}';

blockStatement:
	// localVariableDeclaration ';'
	| statement;
	// | localTypeDeclaration;

statement:
	blockLabel = block
	// | ASSERT expression (':' expression)? ';'
	// | IF parExpression statement (ELSE statement)?
	// | FOR '(' forControl ')' statement
	// | WHILE parExpression statement
	// | DO statement WHILE parExpression ';'
	// | TRY block (catchClause+ finallyBlock? | finallyBlock)
	// | TRY resourceSpecification block catchClause* finallyBlock?
	// | SWITCH parExpression '{' switchBlockStatementGroup* switchLabel* '}'
	// | SYNCHRONIZED parExpression block
	// | RETURN expression? ';'
	// | THROW expression ';'
	| BREAK IDENTIFIER? ';'
	| CONTINUE IDENTIFIER? ';'
	// | SEMI
	// | statementExpression = expression ';'
	| identifierLabel = IDENTIFIER ':' statement;

// program: (std_expr | func_declaration | COMMENT)*;

// std_expr : var_assignment | const_assignment | func_call | assign_to_label;

// var_assignment : KW_LET LABEL OP_ASSIGN expr; const_assignment : KW_CONST LABEL OP_ASSIGN expr;

// assign_to_label : LABEL OP_ASSIGN expr;

// func_declaration : KW_FUNC LABEL L_BRACE std_expr* R_BRACE; func_call : LABEL L_PAR R_PAR | LABEL
// L_PAR ((expr) ',')* (expr) R_PAR;

// expr : expr OP_POW expr | expr (OP_MULTIPLY | OP_DIVIDE) expr | expr (OP_PLUS | OP_SUB) expr |
// L_PAR expr R_PAR | (OP_PLUS | OP_SUB)* NUM_LIT | STR_LIT | func_call | LABEL;

// fragment DIGIT : [0-9]+ ;

// KW_LET : 'let' ; KW_CONST : 'const' ; KW_IF : 'if' ; KW_WHILE : 'while' ; KW_FUNC : 'func';

// OP_ASSIGN: '=' ; OP_PLUS: '+' ; OP_SUB: '-' ; OP_MULTIPLY: '*' ; OP_DIVIDE: '\\' ; OP_POW: '^^' ;
// OP_INCREMENT: '++' ; OP_DECREMENT: '--' ;

// L_BRACE : '{'; R_BRACE : '}'; L_PAR: '('; R_PAR: ')';

// LABEL : [a-zA-Z] ([a-zA-Z_] | DIGIT)* ;

// STR_LIT : '"'.*?'"' ; NUM_LIT : DIGIT+ | DIGIT+ '.' DIGIT+ | '-' DIGIT+ | '-' DIGIT+ '.' DIGIT+ ;

// COMMENT : '$' ~( '\r' | '\n' )* -> skip; WS : [ \t]+ -> skip; EOL : '\r'? '\n' -> skip;