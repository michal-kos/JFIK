SHELL := /bin/bash
antlr_path = /usr/local/lib/antlr-4.7.1-complete.jar
antlr = java -Xmx500M -cp "${antlr_path}:$$CLASSPATH" org.antlr.v4.Tool
grun = java -Xmx500M -cp "${antlr_path}:$$CLASSPATH" org.antlr.v4.gui.TestRig
javac = javac 
out_java_path = grammar/out_java
out_js_path = src/parser

gui:
	cd grammar/ && $(antlr) Java*.g4 -o out_java
	cd ${out_java_path} && $(javac) Java*.java
	cd ${out_java_path} && $(grun) Java compilationUnit ../../examples/HelloWorld.java -gui

node:
	cd grammar/ && $(antlr) -Dlanguage=JavaScript -visitor -o ../src/parser Cash.g4
	node src/cash.js examples/now.cash

generate: 
	antlr4 -Dlanguage=JavaScript grammar/JavaLexer.g4
	antlr4 -Dlanguage=JavaScript grammar/JavaParser.g4
	mv grammar/*.interp grammar/*.tokens mv grammar/*.js ./src/parser