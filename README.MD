# Translator języka Java do C# 


## Spis treści:
- [Sposób użycia translatora](#użycie-translatora)
- [Technologie wykorzystane do stworzenia projektu](#technologie-wykorzystane-do-stworzenia-projektu)
- [Opis systemu typizacji dla języka Java](#opis-systemu-typizacji-dla-jezyka-java)
- [Uzasadnienie wyboru generatora parserów ANTLRv4](#uzasadnienie-wyboru-generatora-parserow-antlrv4)
- [Napotkane problemy oraz sposób ich rozwiązania](#napotkane-problemy-oraz-sposob-ich-rozwizania)
- [Specyfikacja gramatyki języka Java w notacji narzędzia ANTLRv4](#specyfikacja-gramatyki-jezyka-java-w-notacji-narzedzia-antlrv4)
- [Spis literatury](#spis-literatury)

## Użycie translatora

## Technologie wykorzystane do stworzenia projektu
Generator parserów jaki wybraliśmy do zaimplementowania translatora jest narzędzie o nazwie [ANTLR w wersji 4](https://github.com/antlr/antlr4) oraz specjalnie pod nie przygotowaną [gramatykę](https://github.com/antlr/grammars-v4) języka Java. 
Na ten moment do napisania translatora zamierzamy wykorzystać język JavaScript.

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
3. Kolejnym argumentem wyboru tego generatora jest możliwość integracji z językiem JavaScript przez plugin npm. Przez projekty w poprzednich latach mamy z tym językiem duże doświadczenie.

## Napotkane problemy oraz sposób ich rozwiązania

## Specyfikacja gramatyki języka Java w notacji narzędzia ANTLRv4

## Spis literatury
