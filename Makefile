SHELL := /bin/bash
antlr_path = /usr/local/lib/antlr-4.7.2-complete.jar
antlr = java -Xmx500M -cp "${antlr_path}:$$CLASSPATH" org.antlr.v4.Tool
grun = java -Xmx500M -cp "${antlr_path}:$$CLASSPATH" org.antlr.v4.gui.TestRig
javac = javac -cp /usr/local/lib/antlr-4.7.2-complete.jar
out_java_path = grammar/out_java
out_js_path = src/parser
csharp_file_path = ./output.cs

gui:
	cd grammar/ && $(antlr) Java*.g4 -o out_java
	cd ${out_java_path} && $(javac) Java*.java
	cd ${out_java_path} && $(grun) Java compilationUnit ../../examples/Animal.java -gui

node: generate
	node src/app.js examples/HelloWorld.java

generate: 
	antlr4 -Dlanguage=JavaScript grammar/JavaLexer.g4
	antlr4 -Dlanguage=JavaScript -visitor grammar/JavaParser.g4
	mv grammar/*.interp grammar/*.tokens grammar/*.js ./src/parser

java: 
	javac -d ./ examples/HelloWorld.java
	java -classpath . HelloWorld

csharp: 
	mcs -out:output.exe $(csharp_file_path)
	mono output.exe