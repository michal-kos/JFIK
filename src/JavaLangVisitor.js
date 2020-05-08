const JavaParserVisitor = require('./parser/JavaParserVisitor').JavaParserVisitor
const JavaLexer = require('./parser/JavaLexer').JavaLexer;
const JavaToCSharpVocabulary = require('./JavaToCSharpVocabulary')

var javaToCSharpVocabulary;

class Visitor extends JavaParserVisitor {
    start(ctx, tokenChannel) {
        this.tokenChannel = tokenChannel;

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
            text = JavaToCSharpVocabulary.translateFromJavaToCSharp(ctx);

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
                code += JavaToCSharpVocabulary.javaToCSharpVocabulary[JavaLexer.COMMA]
                code += this.visit(ctx.typeList())
            } else {
                code += JavaToCSharpVocabulary.javaToCSharpVocabulary[JavaLexer.COLON]
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

    // UTIL
    isArrayEmpty(array) {
        if (!Array.isArray(array) || !array.length) {
            return true
        }

        return false
    }
}

module.exports = Visitor;