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

## Opis systemu typizacji dla języka Java

Językiem wejściowym, z którego nastąpić ma translacja jest Java. Jest zorientowanym obiektowo językiem programowania opartym na klasach. Wykorzystując Javę tworzy się programy źródłowe kompilowane do wykorzystywanego przez maszynę wirtualną **kodu bajtowego**.

Java jest językiem charakteryzującym się **silnym typowaniem** - oznacza to, że każde wyrażenie posiada ustalony typ i nie można go używać w kontekście innych typów. Językiem silnie typowanym jest również C#, na który kod wejściowy ma zostać przetłumaczony.
Dodatkowo, cechą języka Java jest **typowanie statyczne** - każda nazwa zmiennej jest połączona z konkretnym typem oraz tworzonym obiektem. Innymi słowy, każda zmienna lub pole musi mieć przypisany typ przechowywanych w niej danych oraz każda metoda musi deklarować jakiego typu dane zwraca.

### Podsumowanie - podstawowe koncepcje języka Java
1. Oparcie na paradygmacie programowania obiektowego
2. Typowanie statyczne
3. Silne typowanie
4. Kompilacja kodu źródłowego do kodu bajtowego (*bytecode*), który następnie jest kownertowany do natywnego kodu maszynowego przez maszynę wirtualną (*Java Virtual Machine*)

## Uzasadnienie wyboru generatora parserów ANTLRv4

## Napotkane problemy oraz sposób ich rozwiązania

## Specyfikacja gramatyki języka Java w notacji narzędzia ANTLRv4

## Spis literatury