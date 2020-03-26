// Generated from Cash.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by CashParser.

function CashVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

CashVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
CashVisitor.prototype.constructor = CashVisitor;

// Visit a parse tree produced by CashParser#program.
CashVisitor.prototype.visitProgram = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by CashParser#std_expr.
CashVisitor.prototype.visitStd_expr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by CashParser#var_assignment.
CashVisitor.prototype.visitVar_assignment = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by CashParser#const_assignment.
CashVisitor.prototype.visitConst_assignment = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by CashParser#assign_to_label.
CashVisitor.prototype.visitAssign_to_label = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by CashParser#func_declaration.
CashVisitor.prototype.visitFunc_declaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by CashParser#func_call.
CashVisitor.prototype.visitFunc_call = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by CashParser#expr.
CashVisitor.prototype.visitExpr = function(ctx) {
  return this.visitChildren(ctx);
};



exports.CashVisitor = CashVisitor;