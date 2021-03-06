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

            if (text == null || ctx.symbol.type == 0) {
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

    visitStatement(ctx) {
        if (ctx.FOR() != null) {
            return this.visitForStatement(ctx)
        }

        return this.visitChildren(ctx)
    }

    visitForStatement(ctx) {
        if (ctx.forControl().enhancedForControl() != null) {
            let code = '';

            ctx.FOR().symbol.text = 'foreach'
            ctx.FOR().symbol.type = 0

            for (let i = 0; i < ctx.getChildCount(); i++) {
                code += this.visit(ctx.getChild(i));
            }

            return code
        }

        return this.visitChildren(ctx)
    }

    visitEnhancedForControl(ctx) {
        let code = '';

        ctx.COLON().symbol.text = 'in'
        ctx.COLON().symbol.type = 0

        for (let i = 0; i < ctx.getChildCount(); i++) {
            code += this.visit(ctx.getChild(i));
        }

        return code
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