const JavaParserVisitor = require('./parser/JavaParserVisitor').JavaParserVisitor
const JavaLexer = require('./parser/JavaLexer').JavaLexer;
// const JavaToCSharpVocabulary = require('./JavaToCSharpVocabulary')

var javaToCSharpVocabulary;
// var tokenChannel;

class Visitor extends JavaParserVisitor {
    start(ctx, tokenChannel) {
        this.tokenChannel = tokenChannel;
        this.createTranslatorDictionary();

        return super.visitCompilationUnit(ctx);
    }

    visitChildren(ctx) {
        let code = '';

        for (let i = 0; i < ctx.getChildCount(); i++) {
            code += this.visit(ctx.getChild(i));
        }

        return code;
    }

    visitTerminal(ctx) {
        let text = ''

        if (ctx.symbol.type == JavaLexer.IDENTIFIER) {
            text = ctx.getText();
        } else {
            text = this.translateFromJavaToCSharp(ctx);
        }

        text = this.appendHiddenTokensToLeftOf(ctx) + text;

        return text
    }

    appendHiddenTokensToLeftOf(ctx) {
        let text = ''
        if (this.isArrayEmpty(this.tokenChannel.getHiddenTokensToLeft(ctx.symbol.tokenIndex))) {
            return text;
        } else {
            this.tokenChannel.getHiddenTokensToLeft(ctx.symbol.tokenIndex).forEach(function (token) {
                if (token.text != null) {
                    text += token.text
                }
            });
        }

        return text;
    }

    visitClassDeclaration(ctx) {
        let code = '';
        code += this.visit(ctx.CLASS())
        code += this.visit(ctx.IDENTIFIER())

        if (ctx.EXTENDS() != null) {
            code += this.visit(ctx.EXTENDS())
            code += this.visit(ctx.typeType())
        }

        if (ctx.IMPLEMENTS() != null) {
            if (ctx.EXTENDS() != null) {
                code += javaToCSharpVocabulary[JavaLexer.COMMA]
                code += this.visit(ctx.typeList())
            } else {
                code += javaToCSharpVocabulary[JavaLexer.COLON]
                code += this.visit(ctx.typeList())
            }
        }

        code += this.visit(ctx.classBody());

        return code
    }

    visitMethodDeclaration(ctx) {
        let code = '';
        code += this.visit(ctx.getChild(0))

        const methodName = ctx.IDENTIFIER().getText()
        const methodNameCapitalized = methodName.charAt(0).toUpperCase() + methodName.slice(1)
        code += ' ' + methodNameCapitalized

        for (let i = 2; i < ctx.getChildCount(); i++) {
            code += this.visit(ctx.getChild(i));
        }

        return code
    }

    // TODO - TRANSLATION separate file
    createTranslatorDictionary() {
        javaToCSharpVocabulary = {}
        javaToCSharpVocabulary[JavaLexer.CHAR] = 'char'
        javaToCSharpVocabulary[JavaLexer.FINAL] = 'readonly'
        javaToCSharpVocabulary[JavaLexer.BOOLEAN] = 'bool'
        javaToCSharpVocabulary[JavaLexer.CHAR] = 'char'
        javaToCSharpVocabulary[JavaLexer.BYTE] = 'byte'
        javaToCSharpVocabulary[JavaLexer.SHORT] = 'short'
        javaToCSharpVocabulary[JavaLexer.INT] = 'int'
        javaToCSharpVocabulary[JavaLexer.LONG] = 'long'
        javaToCSharpVocabulary[JavaLexer.FLOAT] = 'float'
        javaToCSharpVocabulary[JavaLexer.DOUBLE] = 'double'
        javaToCSharpVocabulary[JavaLexer.EOF] = '';
        javaToCSharpVocabulary[JavaLexer.ABSTRACT] = 'abstract';
        javaToCSharpVocabulary[JavaLexer.ASSERT] = '2';
        javaToCSharpVocabulary[JavaLexer.BREAK] = 'break';
        javaToCSharpVocabulary[JavaLexer.CASE] = 'case';
        javaToCSharpVocabulary[JavaLexer.CATCH] = 'catch';
        javaToCSharpVocabulary[JavaLexer.CLASS] = 'class';
        javaToCSharpVocabulary[JavaLexer.CONST] = 'const';
        javaToCSharpVocabulary[JavaLexer.CONTINUE] = 'continue';
        javaToCSharpVocabulary[JavaLexer.DEFAULT] = 'default';
        javaToCSharpVocabulary[JavaLexer.DO] = 'do';
        javaToCSharpVocabulary[JavaLexer.ELSE] = 'else';
        javaToCSharpVocabulary[JavaLexer.ENUM] = 'enum';
        javaToCSharpVocabulary[JavaLexer.EXTENDS] = ':'; // <----
        javaToCSharpVocabulary[JavaLexer.FINALLY] = 'finnaly';
        javaToCSharpVocabulary[JavaLexer.FOR] = 'for';
        javaToCSharpVocabulary[JavaLexer.IF] = 'if';
        javaToCSharpVocabulary[JavaLexer.INSTANCEOF] = 'instanceof';
        javaToCSharpVocabulary[JavaLexer.INT] = 'int';
        javaToCSharpVocabulary[JavaLexer.INTERFACE] = 'interface';
        javaToCSharpVocabulary[JavaLexer.LONG] = 'long';
        javaToCSharpVocabulary[JavaLexer.NATIVE] = 'native';
        javaToCSharpVocabulary[JavaLexer.NEW] = 'new';
        javaToCSharpVocabulary[JavaLexer.PACKAGE] = 'package';
        javaToCSharpVocabulary[JavaLexer.PRIVATE] = 'private';
        javaToCSharpVocabulary[JavaLexer.PROTECTED] = 'protected';
        javaToCSharpVocabulary[JavaLexer.PUBLIC] = 'public';
        javaToCSharpVocabulary[JavaLexer.RETURN] = 'return';
        javaToCSharpVocabulary[JavaLexer.SHORT] = 'short';
        javaToCSharpVocabulary[JavaLexer.STATIC] = 'static';
        javaToCSharpVocabulary[JavaLexer.STRICTFP] = 'strictfp';
        javaToCSharpVocabulary[JavaLexer.SUPER] = 'super';
        javaToCSharpVocabulary[JavaLexer.SWITCH] = 'switch';
        javaToCSharpVocabulary[JavaLexer.SYNCHRONIZED] = 'synchronized';
        javaToCSharpVocabulary[JavaLexer.THIS] = 'this';
        javaToCSharpVocabulary[JavaLexer.THROW] = 'throw';
        javaToCSharpVocabulary[JavaLexer.THROWS] = 'throws';
        javaToCSharpVocabulary[JavaLexer.TRANSIENT] = 'transient';
        javaToCSharpVocabulary[JavaLexer.TRY] = 'try';
        javaToCSharpVocabulary[JavaLexer.VOID] = 'void';
        javaToCSharpVocabulary[JavaLexer.VOLATILE] = 'volatile';
        javaToCSharpVocabulary[JavaLexer.WHILE] = 'while';
        javaToCSharpVocabulary[JavaLexer.DECIMAL_LITERAL] = 'decimal_literal';
        javaToCSharpVocabulary[JavaLexer.HEX_LITERAL] = 'hex_literal';
        javaToCSharpVocabulary[JavaLexer.OCT_LITERAL] = 'oct_literal';
        javaToCSharpVocabulary[JavaLexer.BINARY_LITERAL] = 'binary_literal';
        javaToCSharpVocabulary[JavaLexer.FLOAT_LITERAL] = 'float_literal';
        javaToCSharpVocabulary[JavaLexer.HEX_FLOAT_LITERAL] = 'hex_float_literal';
        javaToCSharpVocabulary[JavaLexer.BOOL_LITERAL] = 'bool_literal';
        javaToCSharpVocabulary[JavaLexer.CHAR_LITERAL] = 'char_literal';
        javaToCSharpVocabulary[JavaLexer.STRING_LITERAL] = 'string_literal';
        javaToCSharpVocabulary[JavaLexer.NULL_LITERAL] = 'null_literal';
        javaToCSharpVocabulary[JavaLexer.LPAREN] = '(';
        javaToCSharpVocabulary[JavaLexer.RPAREN] = ')';
        javaToCSharpVocabulary[JavaLexer.LBRACE] = '{';
        javaToCSharpVocabulary[JavaLexer.RBRACE] = '}';
        javaToCSharpVocabulary[JavaLexer.LBRACK] = '[';
        javaToCSharpVocabulary[JavaLexer.RBRACK] = ']';
        javaToCSharpVocabulary[JavaLexer.SEMI] = ';';
        javaToCSharpVocabulary[JavaLexer.COMMA] = ',';
        javaToCSharpVocabulary[JavaLexer.DOT] = '.';
        javaToCSharpVocabulary[JavaLexer.ASSIGN] = '=';
        javaToCSharpVocabulary[JavaLexer.GT] = '>';
        javaToCSharpVocabulary[JavaLexer.LT] = '<';
        javaToCSharpVocabulary[JavaLexer.BANG] = '!';
        javaToCSharpVocabulary[JavaLexer.TILDE] = '~';
        javaToCSharpVocabulary[JavaLexer.QUESTION] = '?';
        javaToCSharpVocabulary[JavaLexer.COLON] = ';';
        javaToCSharpVocabulary[JavaLexer.EQUAL] = '==';
        javaToCSharpVocabulary[JavaLexer.LE] = '<=';
        javaToCSharpVocabulary[JavaLexer.GE] = '>=';
        javaToCSharpVocabulary[JavaLexer.NOTEQUAL] = '!=';
        javaToCSharpVocabulary[JavaLexer.AND] = '&&';
        javaToCSharpVocabulary[JavaLexer.OR] = '||';
        javaToCSharpVocabulary[JavaLexer.INC] = '++';
        javaToCSharpVocabulary[JavaLexer.DEC] = '--';
        javaToCSharpVocabulary[JavaLexer.ADD] = '+';
        javaToCSharpVocabulary[JavaLexer.SUB] = '-';
        javaToCSharpVocabulary[JavaLexer.MUL] = '*';
        javaToCSharpVocabulary[JavaLexer.DIV] = '/';
        javaToCSharpVocabulary[JavaLexer.BITAND] = '&';
        javaToCSharpVocabulary[JavaLexer.BITOR] = '|';
        javaToCSharpVocabulary[JavaLexer.CARET] = '^';
        javaToCSharpVocabulary[JavaLexer.MOD] = '%';
        javaToCSharpVocabulary[JavaLexer.ADD_ASSIGN] = '+=';
        javaToCSharpVocabulary[JavaLexer.SUB_ASSIGN] = '-=';
        javaToCSharpVocabulary[JavaLexer.MUL_ASSIGN] = '*=';
        javaToCSharpVocabulary[JavaLexer.DIV_ASSIGN] = '/=';
        javaToCSharpVocabulary[JavaLexer.AND_ASSIGN] = '&=';
        javaToCSharpVocabulary[JavaLexer.OR_ASSIGN] = '|=';
        javaToCSharpVocabulary[JavaLexer.XOR_ASSIGN] = '^=';
        javaToCSharpVocabulary[JavaLexer.MOD_ASSIGN] = '%=';
        javaToCSharpVocabulary[JavaLexer.LSHIFT_ASSIGN] = '<<=';
        javaToCSharpVocabulary[JavaLexer.RSHIFT_ASSIGN] = '>>=';
        javaToCSharpVocabulary[JavaLexer.URSHIFT_ASSIGN] = '>>>=';
        javaToCSharpVocabulary[JavaLexer.ARROW] = '->';
        javaToCSharpVocabulary[JavaLexer.COLONCOLON] = '::';
        javaToCSharpVocabulary[JavaLexer.AT] = '@';
        javaToCSharpVocabulary[JavaLexer.ELLIPSIS] = '...';
        javaToCSharpVocabulary[JavaLexer.WS] = 'ws';
        javaToCSharpVocabulary[JavaLexer.COMMENT] = 'comment';
        javaToCSharpVocabulary[JavaLexer.LINE_COMMENT] = 'line_comment';
        javaToCSharpVocabulary[JavaLexer.IDENTIFIER] = 'identifier';
    }

    translateFromJavaToCSharp(ctx) {
        let tokenIndex = ctx.symbol.type
        return javaToCSharpVocabulary[tokenIndex]
    }

    // UTIL
    isArrayEmpty(array) {
        if (!Array.isArray(array) || !array.length) {
            return true
        }

        return false
    }
}

module.exports = Visitor;