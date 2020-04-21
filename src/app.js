const antlr = require('antlr4')
const JavaLexer = require('./parser/JavaLexer').JavaLexer
const JavaParser = require('./parser/JavaParser').JavaParser
const JavaLangListener = require('./JavaLangListener').JavaLangListener
const JavaParserListener = require('./parser/JavaParserListener').JavaParserListener

// const CashVisitor = require('./parser/CashVisitor').CashVisitor


const fs = require('fs')

const inputArgs = process.argv.slice(2);
let code;

if (inputArgs.length > 0) {
  if (fs.existsSync(inputArgs[0])) {
    code = fs.readFileSync(inputArgs[0], 'utf8');
  } else {
    console.error("Given file doesn't exist. Exit.");
    process.exit(1);
  }
} else {
  console.error("Usage: app file-name.java");
  process.exit(1);
}

let inputStream = new antlr.InputStream(code);
let lexer = new JavaLexer(inputStream);
let tokens = new antlr.CommonTokenStream(lexer);
let parser = new JavaParser(tokens);
parser.buildParseTrees = true;

var listener = new JavaLangListener(code);
var tree = parser.compilationUnit();

antlr.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);
var result = listener.buildResult();
console.log(code)
console.log("\n\n")
console.log(result)
// var outputFileName = file + ".cs"
// fs.writeFile(outputFileName, result, function (err) {
//     if (err) throw err;
//     console.log('File is created successfully.');
// });  
