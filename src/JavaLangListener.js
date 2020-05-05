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
    // var className = ctx.      
    // append("class " + ctx)
};

JavaLangListener.prototype.exitCompilationUnit = function(ctx) {          
   
};

// CLASS 

JavaLangListener.prototype.enterClassDeclaration = function(ctx) {
    appendIfNotNull(ctx.CLASS() + " " + ctx.IDENTIFIER() + " ")
    if (ctx.EXTENDS() != null) {
        appendIfNotNull(ctx.EXTENDS() + " ")
    }

    if (ctx.IMPLEMENTS() != null) {
        appendIfNotNull(ctx.IMPLEMENTS() + " ")
    }
    methods(ctx)
};

JavaLangListener.prototype.enterClassBody = function(ctx) {
    append("{\n")
};

JavaLangListener.prototype.exitClassBody = function(ctx) {
    append("\n}\n")
}

JavaLangListener.prototype.enterClassBodyDeclaration = function(ctx) {
    append("    ")
}

JavaLangListener.prototype.exitClassBodyDeclaration = function(ctx) {
    append("\n")
}

// Method 

JavaLangListener.prototype.enterMethodDeclaration = function(ctx) {
    append(ctx.IDENTIFIER() + " ")
}

// VARIABLE

JavaLangListener.prototype.enterVariableDeclaratorId = function(ctx) {
    append(ctx.IDENTIFIER())
    if(!isArrayEmpty(ctx.LBRACK()) && !isArrayEmpty(ctx.RBRACK())) {
        append("[]")
    }
}

// TYPE

JavaLangListener.prototype.enterTypeList = function(ctx) {
   
}

JavaLangListener.prototype.exitTypeList = function(ctx) {
   
}

JavaLangListener.prototype.enterTypeTypeOrVoid = function(ctx) {
    if(ctx.typeType() == null) {
        append(ctx.VOID().getText() + " ")
    }
}

JavaLangListener.prototype.enterTypeType = function(ctx) {
    if(!isArrayEmpty(ctx.LBRACK()) && !isArrayEmpty(ctx.RBRACK())) {
        append("[] ")
    }
}

JavaLangListener.prototype.enterClassOrInterfaceType = function(ctx) {
    appendIfNotNull(ctx.getText() + " ")
}

// JavaLangListener.prototype.enterMethodBody = function(ctx) {
//     append(" {\n")
// }

JavaLangListener.prototype.enterBlock = function(ctx) {
    append("{\n")
}

JavaLangListener.prototype.exitBlock = function(ctx) {
    append("\n}\n")
}


// MODIFIERS

JavaParserListener.prototype.enterClassOrInterfaceModifier = function(ctx) {
    // if (ctx.children[0] instanceof antlr4.TerminalNode) {
    //     appendIfNotNull(ctx.getText())
    // }
    if(ctx.annotation() == null) {
        appendIfNotNull(ctx.getText() + " ")
    }

    // methods(ctx)
};

JavaLangListener.prototype.enterModifier = function(ctx) {
    if (ctx.classOrInterfaceModifier() == null) {
        appendIfNotNull(ctx.getText() + " ")
    }
};


// MEMBER

JavaLangListener.prototype.enterMemberDeclaration = function(ctx) {
    // append("    ")
};

// Parameters

JavaLangListener.prototype.enterFormalParameters = function(ctx) {
    append("(")
}

JavaLangListener.prototype.exitFormalParameters = function(ctx) {
    append(") ")
}

JavaLangListener.prototype.enterFormalParameterList = function(ctx) {
    // append("(")
}

JavaLangListener.prototype.enterFormalParameterList = function(ctx) {
    // append("(")
}

// Expression

JavaLangListener.prototype.enterExpression = function(ctx) {
    // append("(")
    methods(ctx)
}

JavaLangListener.prototype.buildResult = function() {
    var result = strings.join("");
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

function append(value) {
    strings.push(value)
}

function methods(ctx) {
    var result = [];
    for (var id in ctx) {
      try {
        if (typeof(ctx[id]) == "function") {
          result.push(id + ": " + ctx[id].toString());
        }
      } catch (err) {
        result.push(id + ": inaccessible");
      }
    }

}

function isArrayEmpty(array) {
    if (!Array.isArray(array) || !array.length) {
       return true
    }
    
    return false
}

exports.JavaLangListener = JavaLangListener;