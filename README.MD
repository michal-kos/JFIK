# Translator języka Java do C# 


## Spis treści:
- [Sposób użycia translatora](#użycie-translatora)
- [Technologie wykorzystane do stworzenia projektu](#technologie-wykorzystane-do-stworzenia-projektu)
- [Opis systemu typizacji dla języka Java](#opis-systemu-typizacji-dla-języka-java)
- [Podstawowe cechy języka C#](#podstawowe-cechy-języka-C#)
- [Uzasadnienie wyboru generatora parserów ANTLRv4](#uzasadnienie-wyboru-generatora-parserów-antlrv4)
- [Napotkane problemy oraz sposób ich rozwiązania](#napotkane-problemy-oraz-sposób-ich-rozwiązania)
- [Specyfikacja gramatyki języka Java w notacji narzędzia ANTLRv4](#specyfikacja-gramatyki-języka-java-w-notacji-narzędzia-antlrv4)
- [Spis literatury](#spis-literatury)

## Użycie translatora

### Wymagane zależności:
- Java Developement Kit,
- ANTLR w wersji 4.7.2 [w przypadku noweszej wersji należy zedytować zmienne w pliku Makefile],
- nodejs wraz z zależnościami w pliku *package.json* (`npm install`)

### Wygenerowanie drzewa składniowego (*parse tree*) 
Plik wejściowy: /examples/HelloWorld.java (możliwa zmiana w pliku Makefile):
```
sudo make gui
```

### Uruchomenie translatora - wygenerowanie przetłumaczonego pliku w języku C# 
Plik wejściowy: /examples/HelloWorld.java - możliwa zmiana w pliku Makefile:
```
sudo make
```
Plik wynikowy z przetłumaczonym kodem trafi do folderu *output/*

### Kompilacja pliku C#:
```
sudo make csharp
```

## Technologie wykorzystane do stworzenia projektu
Generatorem parserów jaki wybraliśmy do zaimplementowania translatora języka Java do C# jest narzędzie o nazwie [ANTLR w wersji 4](https://github.com/antlr/antlr4) wraz ze specjalnie przygotowaną [gramatykę](https://github.com/antlr/grammars-v4) języka Java. 

Translator został napisany w języku JavaScript. Wybraliśmy ten język, ponieważ używamy go także do implementacji naszej pracy inżynierskiej, stąd chcieliśmy nabrać w nim więcej doświadczenia.

## Opis systemu typizacji dla języka Java

Językiem wejściowym, z którego nastąpić ma translacja jest Java. Jest zorientowanym obiektowo językiem programowania opartym na klasach. Wykorzystując Javę tworzy się programy źródłowe kompilowane do wykorzystywanego przez maszynę wirtualną **kodu bajtowego**.

Java jest językiem charakteryzującym się **silnym typowaniem** - oznacza to, że każde wyrażenie posiada ustalony typ i nie można go używać w kontekście innych typów. Językiem silnie typowanym jest również C#, na który kod wejściowy ma zostać przetłumaczony.
Dodatkowo, cechą języka Java jest **typowanie statyczne** - każda nazwa zmiennej jest połączona z konkretnym typem oraz tworzonym obiektem. Innymi słowy, każda zmienna lub pole musi mieć przypisany typ przechowywanych w niej danych oraz każda metoda musi deklarować jakiego typu dane zwraca.

### Podsumowanie - podstawowe koncepcje języka Java
1. Oparcie na paradygmacie programowania obiektowego
2. Typowanie statyczne
3. Silne typowanie
4. Kompilacja kodu źródłowego do kodu bajtowego (*bytecode*), który następnie jest kownertowany do natywnego kodu maszynowego przez maszynę wirtualną (*Java Virtual Machine*)

## Podstawowe cechy języka C#
Język C# posiada wiele cech wspólnych z Javą - przede wszystkim obiektowość i oparcie hierarchii dziedziczenia opartej na klasie *object*. Tak samo jak Java, C# jest językiem silnie typowanym oraz charakteryzuje się statycznym typowaniem, chociaż wspiera elementy typowania dynamicznego (słowo kluczowe *dynamic*).
Kod źródłowy w języku C# jest kompilowany do *intermediate language*, który następnie jest konwertowany do kodu maszynowego.

## Uzasadnienie wyboru generatora parserów ANTLRv4
Kryteria jakimi był podyktowany wybór narzędzia ANTLRv4: 
1. Generator zawiera obszerny zbiór oficjalnych dokumentacji, przykładów oraz gotowych źródeł znacznie ułatwiających pracę z narzędziem.
2. ANTLRv4 napisany jest w języku Java. Przy wyborze narzędzia rozważaliśmy także wybór generatora napisanego w języku Python ale ostatecznie zdecydowaliśmy się na ANTLRv4 z powodu znajomości Javy przez obu członków zespołu.
3. Kolejnym argumentem wyboru tego generatora jest możliwość integracji z językiem JavaScript przez plugin npm. Przez projekty realizowane w poprzednich semestrach mamy z tym językiem większe doświadczenie.

## Napotkane problemy oraz sposób ich rozwiązania

Problemy napotkane w trakcie implementacji:
1. Pierwszy problem był wybór z jakiego wzorca skorzystać przy przejściu przez Abstract Syntax Tree, będącego wynikiem pracy parsera. Nie była to dla nas oczywista decyzja przez brak prosto dostępnych materiałów bezpośrednio dotyczących naszego problemu, dlatego pierwsze próby z wzorcem Listener były nie udane. Dopiero po migracji naszego kodu do wzorca Visitor implementacja stała się dużo prostsza i efektywniejsza.

Wzorzec Listener:
* Zalety:
    - Każdy węzeł posiada metody onEnter oraz onExit, co umożliwia logiczne pogrupowanie operacji wykonywanych na początku i na końcu obsługi węzła. 
* Wady:
    - Z uwagi na automatyczne przejście drzewa AST listener ogranicza możliwość kontroli procesu przetwarzania odpowiednich węzłów. 

Wzorzec Visitor:
* Zalety:
    - Tylko jedna metoda na każdy węzeł (metody zwracają wartość co omija konieczność użycia osobnych zmiennych do przechowywania przetłumaczonego kodu)
    - Większa kontrola nad przechodzeniem drzewa i obsługą jego jego poszczególnych węzłów 
* Wady:
    - W przypadku pominięcia wizytowania dzieci danego węzła ich poddrzewa zostaną pominięte.


2. Kolejnym problemem, który napotkaliśmy było przeniesienie białych znaków z pliku źródłowego do generowanego pliku wyjściowego. Problem udało się nam rozwiązać przenosząc białe znaki z kanału ukrytego do każdego z liścia drzewa odwiedzanego przez nasz Visitor (metoda `visitTerminal(ctx)` oraz `appendHiddenTokensToLeftOf(ctx)`).

## Specyfikacja gramatyki języka Java w notacji narzędzia ANTLRv4
Specyfikacja gramatyki języka Java wspierana przez bibliotekę ANTLRv4 umieszczona została w lokalizacji *grammar/*. Reguły parsera i lexera znajdują się odpowiednio w plikach *JavaLexer.g4* oraz *JavaParser.g4* i pochodzą z oficjalnych [źródeł](https://github.com/antlr/grammars-v4/tree/master/java/java8) biblioteki ANTLRv4. Pliki zostały zmodyfikowane na potrzeby projektu, między innymi przez uproszczenie części gramatyki poprzez usunięcie nieobsługiwanych w transaltorze konstrukcji (jak na przykład wyrażenia lambda). 

Przykładowy fragment reguł parsera przedstawiający niektóre elementy mogące znajdować się w *bloku*:

```
block
    : '{' blockStatement* '}'
    ;

blockStatement
    : localVariableDeclaration ';'
    | statement
    | localTypeDeclaration
    ;

localVariableDeclaration
    : variableModifier* typeType variableDeclarators
    ;

localTypeDeclaration
    : classOrInterfaceModifier*
      (classDeclaration | interfaceDeclaration)
    | ';'
    ;

statement
    : blockLabel=block
    | ASSERT expression (':' expression)? ';'
    | IF parExpression statement (ELSE statement)?
    | FOR '(' forControl ')' statement
    | WHILE parExpression statement
    | DO statement WHILE parExpression ';'
    | TRY block (catchClause+ finallyBlock? | finallyBlock)
    | TRY resourceSpecification block catchClause* finallyBlock?
    | SWITCH parExpression '{' switchBlockStatementGroup* switchLabel* '}'
    | SYNCHRONIZED parExpression block
    | RETURN expression? ';'
    | THROW expression ';'
    | BREAK IDENTIFIER? ';'
    | CONTINUE IDENTIFIER? ';'
    | SEMI
    | statementExpression=expression ';'
    | identifierLabel=IDENTIFIER ':' statement
    ;
```

Tak przygotowana gramatyka umożliwiła generowanie drzew składniowych (*parse tree*) na podstawie wejściowego pliku w języku Java. Przykładowe dwa drzewa przedstawiające konstrukcję standardowej pętli ```for``` oraz typu ```foreach```:

```java
class For_Each      
{ 
    public static void main(String[] arg) 
    { 
        for (int num : numbers){ 
        }

        for (int i=0; i<5; i++){
        }

    } 
} 
```
![](/examples/example_tree.png)

## Spis literatury
- [Dokumentacja narzędzia ANTLR](https://github.com/antlr/antlr4/blob/master/doc/index.md)
- [Dokumentacja języka C#](https://docs.microsoft.com/en-us/dotnet/csharp/)
- [Dokumentacja języka Java](https://docs.oracle.com/javase/7/docs/api/)
- [Porównanie języków C# i Java](https://en.wikipedia.org/wiki/Comparison_of_C_Sharp_and_Java)
- Kernighan B. W., Ritchie D. M., "Język ANSI C.", Wydawnictwa Naukowo-Techniczne
