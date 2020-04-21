const antlr4 = require('antlr4/index');
const JavaLexer = require('./parser/JavaLexer');
const JavaParser = require('./parser/JavaParser');
const JavaParserListener = require('./parser/JavaParserListener').JavaParserListener;
var strings = new Array()

JavaLangListener = function(code) {
    this.Res = code;    
    JavaParserListener.call(this); // inherit default listener
    return this;
};

JavaLangListener.prototype = Object.create(JavaParserListener.prototype)
JavaLangListener.prototype.constructor = JavaLangListener;

JavaLangListener.prototype.enterCompilationUnit = function(ctx) {
    console.log(ctx)    
    // var className = ctx.      
    // append("class " + ctx)
};

JavaLangListener.prototype.exitCompilationUnit = function(ctx) {          
   appendIfNotNull("\n}\n")
};

JavaLangListener.prototype.enterClassDeclaration = function(ctx) {
    // ctx.children.filter(function(element) { return element instanceof JavaParser.TerminalNodeImpl })
    //             .forEach(function(element) { element.getText() })
};

JavaParserListener.prototype.enterClassOrInterfaceModifier = function(ctx) {
    // if (ctx.children[0] instanceof antlr4.TerminalNode) {
    //     appendIfNotNull(ctx.getText())
    // }
};

JavaLangListener.prototype.enterModifier = function(ctx) {
    appendIfNotNull(ctx.getText())
};

JavaLangListener.prototype.buildResult = function() {
    var result = strings.join(" ");
    // if (packageName != "") {
    //     result = "package ${packageName}; \n\n" + result
    // // }
    // Pattern funDeclarations = Pattern.compile("(int|short|long|double|float|void|boolean|char)\\s+([a-zA-Z_]*)(\\()([a-zA-Z0-9\\[\\]()\\s,]*)(\\));")
    // Pattern mainFun = Pattern.compile("static int main(.*)")
    // result = result.replaceAll(funDeclarations, "")
    // result = result.replaceFirst(mainFun, "public static void main(String[] args)")
    return result
}

function appendIfNotNull(value) {
    if (value != null) strings.push(value)
}

exports.JavaLangListener = JavaLangListener;