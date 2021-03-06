const antlr = require('antlr4')
const JavaLexer = require('./parser/JavaLexer').JavaLexer
const JavaParser = require('./parser/JavaParser').JavaParser
const JavaLangVisitor = require('./JavaLangVisitor')

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

var tree = parser.compilationUnit();

var output = 'using System;\n'
output += new JavaLangVisitor().start(tree, tokens);

console.log(output)

var outputFileName = "./output/program.cs"
fs.writeFile(outputFileName, output, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
});  
