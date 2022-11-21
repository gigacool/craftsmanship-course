# KATAs

## TDD 

### FizzBuzz 

FizzBuzz is a typical TDD practice exercise. Let create a function that
- should take values from  1 to 100
- should fizz when input value is a multiple of 3
- should buzz when input value is a multiple of 5
- should fizzbuzz when input value is a multiple of 3 and 5
- should display number when input value is neither multiple of 3 or 5

Tests to start
- input == 1
- input == 3
- input == 5
- input == 15 

### Leap Year

Function to check if a year is a leap year. Function returns true/false
- A year it not a leap year if not divisible by 4
- A year is a leap year if divisible by 4
- A year is a leap year if divisible by 400
- A year is not a leap year if divisible by 100 but not by 400

Tests to start
- 1997 is not a leap year (not divisible by 4)
- 1996 is a leap year (divisible by 4)
- 1600 is a leap year (divisible by 400)
- 1800 is not a leap year (divisible by 4, divisible by 100, not divisible by 400)

### Capitalize

Capitalize takes a string and capitalize each word in it
- empty string remain as is
- single low capitalized letter becomes upercase
- only the first letter of a word is capitalized
- any remaining upercase from the word that is not first letter is converted to lower case
- if a word is full of uppercase letters, it remains unchanged
- unicode characters are well processed, such as ä, ö 
- words can be separated by any whitespaces possible (space, tab, line return, etc.)
- when input is an empty string, returns empty string
- when input is null or undefined, returns empty string

Tests to start
- ''
- a -> A
- hello -> Hello
- hello word -> Hello Word
- heLLo WoRd -> Hello Word
- hello\t\nword -> hello Word
- hellö word ö -> Hellö Word Ö
- null -> ''

### String calculator

Create a string calculator as a function that will get a string in input and return a calculated number as a result.

- Create a simple String calculator with a method signature `int add(string numbers)`
    - can take up to 2 numbers, separated by commas
    - returns the sum of the numbers `add("1,2") -> 3`
    - when receive an empty string, returns 0
- Allow the `add` method to handle an unknown amount of numbers
- Allow the `add` method to handle new lines between numbers (instead of commas).
    - separator is `,` or `\n`
- Support different delimiters
    - delimiter is provided at the beginning of the string `"//[delimiter]\n[numbers...]"`
    - add("//:)\n1:)2") returns 3
- Calling `add` with a negative number will throw an exception `negative numbers not supported: ${negative-values}` 
    - display all negative numbers separated by a whitespace


## Refactoring

The code has been written by another developer. Test coverage is high but code is... perfectable. You have less than a hour to improve it. What do you do ? 

Code source can be found in /sources/katas/refactoring
Test can be run with npm run ctest-refactoring

Think "clean code" 

Original source:  
https://github.com/emilybache/Tennis-Refactoring-Kata/tree/main/javascript-jest