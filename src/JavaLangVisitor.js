const JavaParserVisitor = require('./parser/JavaParserVisitor').JavaParserVisitor
const JavaLexer = require('./parser/JavaLexer').JavaLexer;
// const JavaToCSharpVocabulary = require('./JavaToCSharpVocabulary')

// var javaToCSharpVocabulary = new JavaToCSharpVocabulary()


class Visitor extends JavaParserVisitor {

    start(ctx) {
        return this.visitCompilationUnit(ctx);
    }

    visitChildren(ctx) {
        let code = '';

        for (let i = 0; i < ctx.getChildCount(); i++) {
            code += this.visit(ctx.getChild(i));
            code += ' ';
        }

        return code.trim();
    }

    visitTerminal(ctx) {
        return ctx.getText();
    }

    visitCompilationUnit(ctx) {
        return this.visitChildren(ctx);
    }

    visitClassOrInterfaceModifier(ctx) {
        return ctx.getText() // translate
    }


    //class USBDevice : GenericDevice, IOurDevice

    visitClassDeclaration(ctx) {
        let code = '';
        code += ctx.CLASS() + ' ' //translate
        code += ctx.IDENTIFIER() + ' '
        if (ctx.EXTENDS() != null) {
            code += ctx.EXTENDS() + ' ' // translate
            code += this.visit(ctx.typeType()) + ' '
        }

        if (ctx.IMPLEMENTS() != null) {
            if (ctx.EXTENDS() != null) {
                //class USBDevice : GenericDevice, IOurDevice z klasą czyli apendujemy comma i typy
                code += ctx.IMPLEMENTS() + ' ' // translate
                code += this.visit(ctx.typeList()) + ' ' // translate
            } else {
                // class USBDevice : IOurDevice bez klasy czyli apendujemy dwukropkiem i typy
                code += ctx.IMPLEMENTS() + ' ' // translate
                code += this.visit(ctx.typeList()) + ' ' // translate
            }
        }

        code += this.visit(ctx.classBody());

        return code.trim();
    }

    visitClassBody(ctx) {
        let code = '';
        code += ctx.LBRACE() + '\n';
        code += this.visit(ctx.classBodyDeclaration())
        code += '\n' + ctx.RBRACE();

        return code.trim();
    }

    visitMemberDeclaration(ctx) {
        return this.visitChildren(ctx);
    }

    visitMethodDeclaration(ctx) {
        return this.visitChildren(ctx);
    }

    visitTypeList(ctx) {
        let code = '';

        for (let i = 0; i < ctx.getChildCount(); i++) {
            code += this.visit(ctx.getChild(i));
            code += ' ';
        }

        return code.trim();
    }

    visitTypeTypeOrVoid(ctx) {
        if (ctx.typeType() == null) {
            return ctx.VOID().getText();
        }

        return super.visitChildren(ctx);
    }

    visitTypeType(ctx) {
        let code = this.visit(ctx.getChild(0));
        if (ctx.LBRACK() == null) {
            return code
        } else {
            var parentises = ctx.LBRACK() + ctx.RBRACK()
            code += parentises
        }

        return code;
    }

    visitFormalParameters(ctx) {
        let code = '';
        code += ctx.LPAREN();
        if (ctx.formalParameterList() != null) {
            code += this.visit(ctx.getChild(1))
        }
        code += ctx.RPAREN();

        return code.trim();
    }

    visitFormalParameterList(ctx) {
        return super.visitChildren(ctx);
    }

    visitFormalParameter(ctx) {
        let code = '';
        code += this.visit(ctx.getChild(0)) + ' '; //TYPETYPe
        code += this.visit(ctx.getChild(1)); //variableDeclaratorId

        return code.trim();
    }

    visitPrimitiveType(ctx) {
        return ctx.getText() // translate
        // return translateFromJavaToCSharp(ctx.getChild(0).symbol)
    }

    visitMethodBody(ctx) {
        return this.visitChildren(ctx);
    }

    visitBlock(ctx) {
        let code = '';
        code += ctx.LBRACE() + '\n';
        for (let i = 1; i < ctx.getChildCount() - 1; i++) {
            code += this.visit(ctx.getChild(i));
            code += '\n';
        }
        code += ctx.RBRACE() + '\n';

        return code;
    }

    visitLocalVariableDeclaration(ctx) {
        return this.visitChildren(ctx);
    }

    visitVariableModifier(ctx) {
        if (ctx.FINAL() != null) {
            return ctx.FINAL(); // translate
        }
        
        return this.visitChildren(ctx);
    }
}

module.exports = Visitor;