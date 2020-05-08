const JavaParserVisitor = require('./parser/JavaParserVisitor').JavaParserVisitor
const JavaLexer = require('./parser/JavaLexer').JavaLexer;

var javaToCSharpVocabulary;

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

            if (text == null) {
                text = ctx.getText();
            }
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

        const methodName = ctx.IDENTIFIER().getText()
        const methodNameCapitalized = methodName.charAt(0).toUpperCase() + methodName.slice(1)
        ctx.IDENTIFIER().symbol.text = methodNameCapitalized

        for (let i = 0; i < ctx.getChildCount(); i++) {
            let child = ctx.getChild(i)

            if (child === ctx.THROWS() || child === ctx.qualifiedNameList()) {
                continue
            }
            
            code += this.visit(ctx.getChild(i));
        }

        return code
    }

    visitMethodCall(ctx) {
        let code = '';

        const methodName = ctx.IDENTIFIER().getText()
        const methodNameCapitalized = methodName.charAt(0).toUpperCase() + methodName.slice(1)
        ctx.IDENTIFIER().symbol.text = methodNameCapitalized

        for (let i = 0; i < ctx.getChildCount(); i++) {
            code += this.visit(ctx.getChild(i));
        }

        return code
    }

    visitInterfaceMethodDeclaration(ctx) {
        let code = '';

        const methodName = ctx.IDENTIFIER().getText()
        const methodNameCapitalized = methodName.charAt(0).toUpperCase() + methodName.slice(1)
        ctx.IDENTIFIER().symbol.text = methodNameCapitalized

        for (let i = 0; i < ctx.getChildCount(); i++) {
            code += this.visit(ctx.getChild(i));
        }

        return code
    }
    
    // TODO: 
    // -visitEnhancedForControl(ctx){} for (char ch : strChars)
    // -visitCatchClause(ctx){} catch (IOException | IllegalArgumentException ex) 
    // -visitstatment -> try with resources
    // -visitstatment -> assert assert n != 0;
    // -inner class constructor
    /*
    static void Inner_class_constructor() {
        // https://docs.oracle.com/javase/specs/jls/se9/html/jls-15.html#jls-15.9
        Foo foo = new Foo();
        Foo.Bar fooBar1 = foo.new Bar();
        Foo.Bar fooBar2 = new Foo().new Bar();
    }
    */
    // -local class 
    /*
    // Local class
    class Foo {
        void Bar() {
            @WeakOuter
            class Foobar {// Local class within a method
            }
        }
    }
    */
    // - initialization
    /*
    class Foo {
        static {
            // Initialization
        }
    }

    class Foo {
        {
            // Initialization
        }
    }
    */
    // System.out.println(Foo.class.getName() + ": constructor runtime");
    // -int...
    // -@Override
    // -abstract class
    // -enum
    // -local interface
    // annotations
    // generic classes, methods, constructors

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
        javaToCSharpVocabulary[JavaLexer.ASSERT] = 'assert';
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
        javaToCSharpVocabulary[JavaLexer.FINALLY] = 'finally';
        javaToCSharpVocabulary[JavaLexer.FOR] = 'for';
        javaToCSharpVocabulary[JavaLexer.IF] = 'if';
        javaToCSharpVocabulary[JavaLexer.INSTANCEOF] = 'instanceof';
        javaToCSharpVocabulary[JavaLexer.IMPORT] = 'using';
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
        javaToCSharpVocabulary[JavaLexer.NULL_LITERAL] = 'null';
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
        javaToCSharpVocabulary[JavaLexer.COLON] = ':';
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