const JavaLexer = require('./parser/JavaLexer').JavaLexer

class JavaToCSharpVocabulary {
    // public static final def unsupportedPlaceholder = "\${statement}"
    // private static final def unsupportedStatement = "Unsuported statement: $unsupportedPlaceholder"

    constructor() {
        dict = Object()
        dict[JavaLexer.CHAR] = "char"
    }
    
    translateFromJavaToCSharp(token) {
        // { JavaLexer,CHAR: "char" };
        return dict[tokenIndex]
    }
}

module.exports = JavaToCSharpVocabulary;