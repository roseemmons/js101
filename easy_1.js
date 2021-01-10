// Easy 1
/*
Write a function that takes one integer argument, which may be positive, 
negative, or zero. This method returns true if the number's absolute value 
is odd. You may assume that the argument is a valid integer value.
*/
const isOdd = function(num) {
  let result = null;
  if (Math.abs(num) % 2 === 0) {
    result = false;
  } else {
    result = true;
  }
  return result;
}
console.log(isOdd(2)); // => false


/*
Log all odd numbers from 1 to 99, inclusive, to the console, with each number
on a separate line.
*/
const logOddNumsInRange = function(startNum, endNum) {
  for (let index = startNum; index <= endNum; index += 1) {
    if ( !(index % 2 === 0) ) {
      console.log(index);
    }
  }
}
logOddNumsInRange(1, 99);


/*
Log all even numbers from 1 to 99, inclusive, to the console, with each number
on a separate line.
*/
const logEvenNumsInRange = function(startNum, endNum) {
  for (let index = startNum; index <= endNum; index += 1) {
    if (index % 2 === 0) {
      console.log(index);
    }
  }
}
logEvenNumsInRange(1, 99);


/*
Build a program that asks the user to enter the length and width of a room in
meters, and then logs the area of the room to the console in both square meters
and square feet.  Note: 1 square meter == 10.7639 square feet

Do not worry about validating the input at this time. Use the
readlineSync.prompt method to collect user input.
*/
const logAreaOfTheRoom = function() {
  // User input
  let rlSync = require('readline-sync');
  let roomLength = rlSync.question("Enter the length of the room in meters:\n");
  let roomWidth = rlSync.question("Enter the width of the room in meters:\n");

  // Calculations
  const areaInSquareMeters = roomLength * roomWidth;
  const numberOfSquareFeetInOneMeter = 10.7639;
  const areaInSquareFeet = areaInSquareMeters * numberOfSquareFeetInOneMeter;

  // Output
  console.log(`The area of the room is ${areaInSquareMeters.toFixed(2)} square meters (${areaInSquareFeet.toFixed(2)} square feet).`);
}
logAreaOfTheRoom();


/*
Create a simple tip calculator. The program should prompt for a bill amount and
a tip rate. The program must compute the tip, and then log both the tip and the
total amount of the bill to the console. You can ignore input validation and
assume that the user will enter numbers.
*/
const tipCalculator = function() {
  // User input
  let rlSync = require('readline-sync');
  let billAmount = Number(rlSync.question("What is the bill?\n"));
  let tipPercent = Number(rlSync.question("What is the tip percentage?\n"));

  // Calculations
  const tipPercentToDecimal = tipPercent / 100;
  const tip = billAmount * tipPercentToDecimal;
  const total = billAmount + tip;

  // Output
  console.log(`The tip is $${tip.toFixed(2)}`);
  console.log(`The total is $${total.toFixed(2)}`);
}
tipCalculator();


/*
Write a program that asks the user to enter an integer greater than 0, then asks
whether the user wants to determine the sum or the product of all numbers between
1 and the entered integer, inclusive.
*/
const calcFunc = function() {
  // Addition function
  const calcSum = function(int) {
    let sum = 0;
    for (let i = 1; i <= int; i += 1) {
      sum += i;
    }
    return `The sum of the integers between 1 and ${int} is ${sum}.`;
  }

  // Multiplication function
  const calcProduct = function(int) {
    let product = 1;
    for (let i = 1; i <= int; i += 1) {
      product *= i;
    }
    return `The product of the integers between 1 and ${int} is ${product}.`;  
  }

  // User input
  let rlSync = require('readline-sync');
  let userInt = Number(rlSync.question("Please enter an integer greater than 0: "));
  let userCmd = rlSync.question('Enter "s" to compute the sum, or "p" to compute the product. ');
  let result = null;

  // Logic
  if (userCmd  === 's') {
    result = calcSum(userInt);
  } else if (userCmd === 'p') {
    result = calcProduct(userInt);
  }

  // Output
  console.log(result);
}
calcFunc();


/*
Write a function that takes two strings as arguments, determines the longer of
the two strings, and then returns the result of concatenating the shorter string,
the longer string, and the shorter string once again. You may assume that the
strings are of different lengths.
*/
const shortLongShort = function(str1, str2) {
  let result = null;

  if (str1.length < str2.length) {
    result = `${str1}${str2}${str1}`;
  } else {
    result = `${str2}${str1}${str2}`;
  }

  return result;
}
console.log(shortLongShort('hello', 'dog'));


/*
In the modern era, under the Gregorian Calendar, leap years occur in every year
that is evenly divisible by 4, unless the year is also divisible by 100. If the
year is evenly divisible by 100, then it is not a leap year, unless the year is
also evenly divisible by 400.

Assume this rule is valid for any year greater than year 0. Write a function
that takes any year greater than 0 as input, and returns true if the year is a
leap year, or false if it is not a leap year.
*/
const isLeapYear = function(year) {
  let result = false;

  // If the year can be evenly divided by 400
  // - OR -
  // if the year is evenly divided by 4, but NOT also by 100
  // result is set to true.
  if ( ( year % 400 === 0 ) || ( year % 4 === 0 && year % 100 !== 0 ) ) {
    result = true;
  }
  return result;
}
console.log(isLeapYear(2016));


/*
This is a continuation of the previous exercise.

The British Empire adopted the Gregorian Calendar in 1752, which was a leap
year. Prior to 1752, they used the Julian Calendar. Under the Julian Calendar,
leap years occur in any year that is evenly divisible by 4.

Using this information, update the function from the previous exercise to
determine leap years both before and after 1752.
*/
const isLeapYear = function(num) {
  // Calculate the Gregorian Leap Year
  const isGregorianLeapYear = function(year) {
    let result = false;
    if ( ( year % 400 === 0 ) || ( year % 4 === 0 && year % 100 !== 0 ) ) {
      result = true;
    }
    return result;
  }

  // Calculate the Julian Leap Year
  const isJulianLeapYear = function(year) {
    let result = false;
    if ( year % 4 === 0 ) {
      result = true;
    }
    return result;
  }

  // Determine Julian or Gregorian
  if ( num < 1752 ) {
    isJulianLeapYear(num);
  } else {
    isGregorianLeapYear(num);
  }
}
console.log(isLeapYear(2016));


/*
Write a function that computes the sum of all numbers between 1 and some other
number, inclusive, that are multiples of 3 or 5. For instance, if the supplied
number is 20, the result should be 98 (3 + 5 + 6 + 9 + 10 + 12 + 15 + 18 + 20).

You may assume that the number passed in is an integer greater than 1.
*/
const multiSum = function(num) {
  let result = 0;

  for (let i = 0; i <= num; i += 1) {
    if ( ( i % 3 === 0 ) || ( i % 5 === 0 ) ) {
      result += i;
    }
  }

  return result;
}
console.log(multiSum(1000));


/*
Write a function that determines and returns the ASCII string value of a string
passed in as an argument. The ASCII string value is the sum of the ASCII values
of every character in the string. (You may use String.prototype.charCodeAt() to
determine the ASCII value of a character.)
*/
const asciiValue = function(str) {
  let result = 0;

  for (let i = 0; i < str.length; i += 1) {
    result += str.charCodeAt(i);
  }

  return result;
}
console.log(asciiValue('Launch School'));   // 1251