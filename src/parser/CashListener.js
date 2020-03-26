// Generated from Cash.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by CashParser.
function CashListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

CashListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
CashListener.prototype.constructor = CashListener;

// Enter a parse tree produced by CashParser#program.
CashListener.prototype.enterProgram = function(ctx) {
};

// Exit a parse tree produced by CashParser#program.
CashListener.prototype.exitProgram = function(ctx) {
};


// Enter a parse tree produced by CashParser#std_expr.
CashListener.prototype.enterStd_expr = function(ctx) {
};

// Exit a parse tree produced by CashParser#std_expr.
CashListener.prototype.exitStd_expr = function(ctx) {
};


// Enter a parse tree produced by CashParser#var_assignment.
CashListener.prototype.enterVar_assignment = function(ctx) {
};

// Exit a parse tree produced by CashParser#var_assignment.
CashListener.prototype.exitVar_assignment = function(ctx) {
};


// Enter a parse tree produced by CashParser#const_assignment.
CashListener.prototype.enterConst_assignment = function(ctx) {
};

// Exit a parse tree produced by CashParser#const_assignment.
CashListener.prototype.exitConst_assignment = function(ctx) {
};


// Enter a parse tree produced by CashParser#assign_to_label.
CashListener.prototype.enterAssign_to_label = function(ctx) {
};

// Exit a parse tree produced by CashParser#assign_to_label.
CashListener.prototype.exitAssign_to_label = function(ctx) {
};


// Enter a parse tree produced by CashParser#func_declaration.
CashListener.prototype.enterFunc_declaration = function(ctx) {
};

// Exit a parse tree produced by CashParser#func_declaration.
CashListener.prototype.exitFunc_declaration = function(ctx) {
};


// Enter a parse tree produced by CashParser#func_call.
CashListener.prototype.enterFunc_call = function(ctx) {
};

// Exit a parse tree produced by CashParser#func_call.
CashListener.prototype.exitFunc_call = function(ctx) {
};


// Enter a parse tree produced by CashParser#expr.
CashListener.prototype.enterExpr = function(ctx) {
};

// Exit a parse tree produced by CashParser#expr.
CashListener.prototype.exitExpr = function(ctx) {
};



exports.CashListener = CashListener;