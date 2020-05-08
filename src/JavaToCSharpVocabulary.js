const JavaLexer = require('./parser/JavaLexer').JavaLexer;

var javaToCSharpVocabulary =  {
    [JavaLexer.CHAR] : 'char',
    [JavaLexer.FINAL] : 'readonly',
    [JavaLexer.BOOLEAN] : 'bool',
    [JavaLexer.CHAR] : 'char',
    [JavaLexer.BYTE] : 'byte',
    [JavaLexer.SHORT] : 'short',
    [JavaLexer.INT] : 'int',
    [JavaLexer.LONG] : 'long',
    [JavaLexer.FLOAT] : 'float',
    [JavaLexer.DOUBLE] : 'double',
    [JavaLexer.EOF] : '',
    [JavaLexer.ABSTRACT] : 'abstract',
    [JavaLexer.ASSERT] : 'assert',
    [JavaLexer.BREAK] : 'break',
    [JavaLexer.CASE] : 'case',
    [JavaLexer.CATCH] : 'catch',
    [JavaLexer.CLASS] : 'class',
    [JavaLexer.CONST] : 'const',
    [JavaLexer.CONTINUE] : 'continue',
    [JavaLexer.DEFAULT] : 'default',
    [JavaLexer.DO] : 'do',
    [JavaLexer.ELSE] : 'else',
    [JavaLexer.ENUM] : 'enum',
    [JavaLexer.EXTENDS] : ':', // <----
    [JavaLexer.FINALLY] : 'finally',
    [JavaLexer.FOR] : 'for',
    [JavaLexer.IF] : 'if',
    [JavaLexer.INSTANCEOF] : 'instanceof',
    [JavaLexer.IMPORT] : 'using',
    [JavaLexer.INTERFACE] : 'interface',
    [JavaLexer.LONG] : 'long',
    [JavaLexer.NATIVE] : 'native',
    [JavaLexer.NEW] : 'new',
    [JavaLexer.PACKAGE] : 'package',
    [JavaLexer.PRIVATE] : 'private',
    [JavaLexer.PROTECTED] : 'protected',
    [JavaLexer.PUBLIC] : 'public',
    [JavaLexer.RETURN] : 'return',
    [JavaLexer.SHORT] : 'short',
    [JavaLexer.STATIC] : 'static',
    [JavaLexer.STRICTFP] : 'strictfp',
    [JavaLexer.SUPER] : 'super',
    [JavaLexer.SWITCH] : 'switch',
    [JavaLexer.SYNCHRONIZED] : 'synchronized',
    [JavaLexer.THIS] : 'this',
    [JavaLexer.THROW] : 'throw',
    [JavaLexer.THROWS] : 'throws',
    [JavaLexer.TRANSIENT] : 'transient',
    [JavaLexer.TRY] : 'try',
    [JavaLexer.VOID] : 'void',
    [JavaLexer.VOLATILE] : 'volatile',
    [JavaLexer.WHILE] : 'while',
    [JavaLexer.NULL_LITERAL] : 'null',
    [JavaLexer.LPAREN] : '(',
    [JavaLexer.RPAREN] : ')',
    [JavaLexer.LBRACE] : '{',
    [JavaLexer.RBRACE] : '}',
    [JavaLexer.LBRACK] : '[',
    [JavaLexer.RBRACK] : ']',
    [JavaLexer.SEMI] : ';',
    [JavaLexer.COMMA] : ',',
    [JavaLexer.DOT] : '.',
    [JavaLexer.ASSIGN] : '=',
    [JavaLexer.GT] : '>',
    [JavaLexer.LT] : '<',
    [JavaLexer.BANG] : '!',
    [JavaLexer.TILDE] : '~',
    [JavaLexer.QUESTION] : '?',
    [JavaLexer.COLON] : ':',
    [JavaLexer.EQUAL] : '==',
    [JavaLexer.LE] : '<=',
    [JavaLexer.GE] : '>=',
    [JavaLexer.NOTEQUAL] : '!=',
    [JavaLexer.AND] : '&&',
    [JavaLexer.OR] : '||',
    [JavaLexer.INC] : '++',
    [JavaLexer.DEC] : '--',
    [JavaLexer.ADD] : '+',
    [JavaLexer.SUB] : '-',
    [JavaLexer.MUL] : '*',
    [JavaLexer.DIV] : '/',
    [JavaLexer.BITAND] : '&',
    [JavaLexer.BITOR] : '|',
    [JavaLexer.CARET] : '^',
    [JavaLexer.MOD] : '%',
    [JavaLexer.ADD_ASSIGN] : '+=',
    [JavaLexer.SUB_ASSIGN] : '-=',
    [JavaLexer.MUL_ASSIGN] : '*=',
    [JavaLexer.DIV_ASSIGN] : '/=',
    [JavaLexer.AND_ASSIGN] : '&=',
    [JavaLexer.OR_ASSIGN] : '|=',
    [JavaLexer.XOR_ASSIGN] : '^=',
    [JavaLexer.MOD_ASSIGN] : '%=',
    [JavaLexer.LSHIFT_ASSIGN] : '<<=',
    [JavaLexer.RSHIFT_ASSIGN] : '>>=',
    [JavaLexer.URSHIFT_ASSIGN] : '>>>=',
    [JavaLexer.ARROW] : '->',
    [JavaLexer.COLONCOLON] : '::',
    [JavaLexer.AT] : '@',
    [JavaLexer.ELLIPSIS] : '...',
}

function translateFromJavaToCSharp(ctx) {
    let tokenIndex = ctx.symbol.type
    return javaToCSharpVocabulary[tokenIndex]
}

exports.javaToCSharpVocabulary = javaToCSharpVocabulary;
exports.translateFromJavaToCSharp = translateFromJavaToCSharp;