grammar Cash ;

program: (std_expr | func_declaration | COMMENT)*;

std_expr : var_assignment | const_assignment | func_call | assign_to_label;

var_assignment : KW_LET LABEL OP_ASSIGN expr;
const_assignment : KW_CONST LABEL OP_ASSIGN expr;

assign_to_label : LABEL OP_ASSIGN expr;

func_declaration : KW_FUNC LABEL L_BRACE std_expr* R_BRACE;
func_call : LABEL L_PAR R_PAR
          | LABEL L_PAR ((expr) ',')* (expr) R_PAR;

expr : expr OP_POW expr
     |  expr  (OP_MULTIPLY | OP_DIVIDE)  expr
     |  expr  (OP_PLUS | OP_SUB) expr
     |  L_PAR expr R_PAR
     |  (OP_PLUS | OP_SUB)* NUM_LIT
     | STR_LIT | func_call | LABEL;

fragment DIGIT : [0-9]+ ;

KW_LET   : 'let' ;
KW_CONST : 'const' ;
KW_IF    : 'if' ;
KW_WHILE : 'while' ;
KW_FUNC : 'func';

OP_ASSIGN: '=' ;
OP_PLUS: '+' ;
OP_SUB: '-' ;
OP_MULTIPLY: '*' ;
OP_DIVIDE: '\\' ;
OP_POW: '^^' ;
OP_INCREMENT: '++' ;
OP_DECREMENT: '--' ;

L_BRACE : '{';
R_BRACE : '}';
L_PAR: '(';
R_PAR: ')';

LABEL : [a-zA-Z] ([a-zA-Z_] | DIGIT)* ;

STR_LIT : '"'.*?'"' ;
NUM_LIT : DIGIT+ 
                | DIGIT+ '.' DIGIT+
                | '-' DIGIT+
                | '-' DIGIT+ '.' DIGIT+
                ; 

COMMENT  :  '$' ~( '\r' | '\n' )* -> skip;
WS : [ \t]+ -> skip;
EOL : '\r'? '\n' -> skip;