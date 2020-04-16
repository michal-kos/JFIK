const antlr = require('antlr4')
const JavaLexer = require('./parser/JavaLexer').JavaLexer
const JavaParser = require('./parser/JavaParser').JavaParser
const JavaListener = require('./parser/JavaParserListener').JavaParserListener
// const CashVisitor = require('./parser/CashVisitor').CashVisitor
// const fs = require('fs')

// const inputArgs = process.argv.slice(2);
// let code;

// if (inputArgs.length > 0) {
//   if (fs.existsSync(inputArgs[0])) {
//     code = fs.readFileSync(inputArgs[0], 'utf8');
//   } else {
//     console.error("Given file doesn't exist. Exit.");
//     process.exit(1);
//   }
// } else {
//   console.error("Usage: cash file-name.cash");
//   process.exit(1);
// }


// let inputStream = new antlr.InputStream(code);
// let lexer = new CashLexer(inputStream);
// let tokens = new antlr.CommonTokenStream(lexer);
// let parser = new CashParser(tokens);
// parser.buildParseTrees = true;
// var tree = parser.program();

// let symbolicNamesDict = {};
// parser.symbolicNames.forEach((p, k) => {
//   symbolicNamesDict[k] = p;
// });

// const DATA_TYPES = {
//   STR_LIT: "STR_LIT",
//   NUM_LIT: "NUM_LIT",
//   LABEL: "LABEL"
// };

// class variable {
//   constructor(name, value, type, is_const) {
//     this.name = name;
//     this.value = value;
//     this.type = type;
//     this.is_const = is_const;
//   }
// }

// let vars_n_consts = {};
// let functions = {};

// function get_symbol_type(node) {
//   return symbolicNamesDict[node.symbol.type];
// }

// function strip_str(str) {
//   return str.replace(/^"/, "").replace(/"$/, "")
// }

// function strip_if_str(node) {
//   let type = symbolicNamesDict[node.symbol.type];
//   if (type === "STR_LIT") {
//     return strip_str(node.getText());
//   }

//   return node.getText();
// }

// /**
//  * Evaluates expression tree starting from last element (highest priority)
//  * @param leaf
//  */
// function evaluate_expression_tree(leaf) {

// }

// function declare_var_or_const(data) {
//   const is_assigning = data.children.length !== 4;

//   let is_const = false;
//   let name = null;
//   let value = null;
//   let type = null;

//   if (!is_assigning) { // new variable declaration
//     is_const = data.children[0].getText() === 'const';
//     name = data.children[1].getText();
//     value = data.children[3].getText();
//     type = symbolicNamesDict[data.children[3].symbol.type];
//   } else { // "assign to label"/assigning
//     name = data.children[0].getText();
//     value = data.children[2].getText();
//     type = symbolicNamesDict[data.children[2].symbol.type];
//   }

//   if (type === DATA_TYPES.STR_LIT) {
//     value = strip_str(value)
//   }

//   if (typeof vars_n_consts[name] !== 'undefined' && vars_n_consts[name].is_const) {
//     console.error("Error: const " + name + " already defined and it can't be changed!");
//   } else if (typeof vars_n_consts[name] !== 'undefined' && !is_assigning) {
//     console.error("Error: variable " + name + " already defined.");
//   } else if (typeof vars_n_consts[name] !== "undefined" && is_assigning) {
//     vars_n_consts[name].value = value;
//   } else if(is_assigning) {
//     console.error("Error: unknown variable " + name);
//   } else {
//     new_obj = new variable(name, value, type, is_const);
//     vars_n_consts[name] = new_obj;
//   }
// }

// function call_func(data) {
//   let func_name = data.children[0].getText();
//   let args_list = data.children.slice(2, data.children.length - 1).filter(a => a.getText() !== ",");

//   if (func_name === 'print') {
//     args_list.forEach(a => {
//       switch (get_symbol_type(a)) {
//         case 'STR_LIT':
//           console.log(strip_str(a.getText()));
//           break;
//         case 'NUM_LIT':
//           console.log(a.getText())
//           break;
//         case 'LABEL':
//           console.log(vars_n_consts[a.getText()].value);
//           break;
//       }
//     });
//   }
// }

// CashVisitor.prototype.visitVar_assignment = ctx => {
//   declare_var_or_const(ctx)
// };

// CashVisitor.prototype.visitConst_assignment = ctx => {
//   declare_var_or_const(ctx)
// }

// CashVisitor.prototype.visitAssign_to_label = ctx => {
//   declare_var_or_const(ctx)
// }

// CashVisitor.prototype.visitFunc_call = ctx => {
//   call_func(ctx)
// };

// tree.accept(new CashVisitor())