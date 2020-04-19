const antlr4 = require('antlr4/index');
const JavaLexer = require('./parser/JavaLexer');
const JavaParser = require('./parser/JavaParser');
const JavaParserListener = require('./parser/JavaParserListener').JavaParserListener;

JavaLangListener = function(code) {
    this.Res = code;    
    JavaParserListener.call(this); // inherit default listener
    return this;
};

JavaLangListener.prototype = Object.create(JavaParserListener.prototype)
JavaLangListener.prototype.constructor = JavaLangListener;

JavaLangListener.prototype.enterCompilationUnit = function(ctx) {          
    console.log("jestem3")   
};

JavaLangListener.prototype.exitCompilationUnit = function(ctx) {          
    console.log("jestem4")   
};

JavaLangListener.prototype.enterTypeDeclaration = function(ctx) {
    console.log("jestem5")  
};

exports.JavaLangListener = JavaLangListener;