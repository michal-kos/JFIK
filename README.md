# JFIK
Jezyki formalne i kompilatory - projekt

## Requirements
0. Java 1.6 or higher
1. [ANTLR v4](https://www.antlr.org/), [Getting started with ANTLTRv4 (installation docs)](https://github.com/antlr/antlr4/blob/master/doc/getting-started.md)
2. [Node.js](https://nodejs.org/en/)
3. [GNU make](https://www.gnu.org/software/make/) - (optional to run Makefiles)

## Makefile
* `gui` - compiles ANTLR and runs grun on file `now.cash`
* `node` - compiles ANTLR with JS target and runs `index.js` with `now.cash` file to interpret