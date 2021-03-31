
/*
** 1. Create a function that takes 2 arguments, an array and an object. The array will
** contain 2 or more elements that, when combined with adjoining spaces, will
** produce a person's name. The object will contain two keys, "title" and
** "occupation", and the appropriate values. Your function should return a greeting
** that uses the person's full name, and mentions the person's title.
*/
function greetings(arr, obj) {
  return `Hello, ${arr.join(' ')}! Nice to have a ${obj['title']} ${obj['occupation']} around.`;
}

console.log(
  greetings(["John", "Q", "Doe"], { title: "Master", occupation: "Plumber" })
);
// logs Hello, John Q Doe! Nice to have a Master Plumber around.


/*
** 2. Write a program that will ask for user's name. The program will then greet
** the user. If the user writes "name!" then the computer yells back to the user.
*/
function talkOrShoutGreeting(name) {
  if ( name.endsWith("!") ) {
    console.log(`HELLO, ${name.toUpperCase()}. WHY ARE WE SCREAMING?`);
  } else {
    console.log(`Hello, ${name}.`);
  }
}
talkOrShoutGreeting("Bob!");


// 3. Create a function that takes two arguments, multiplies them together, and returns the result.
function multiply(num1, num2) {
  return num1 * num2;
}
console.log(multiply(5, 3) === 15); // logs true


/*
** 4. Using the multiply() function from the "Multiplying Two Numbers" problem,
** write a function that computes the square of its argument (the square is the
** result of multiplying a number by itself).
*/
function square(num) {
  return multiply(num, num);
}
console.log(square(5) === 25); // logs true
console.log(square(-8) === 64); // logs true


/*
** 5. Write a program that prompts the user for two positive integers, and then
** prints the results of the following operations on those two numbers: addition,
** subtraction, product, quotient, remainder, and power. Do not worry about
** validating the input.
*/
function calculateNumbers(num1, num2) {
  console.log(`${num1} + ${num2} = ${num1 + num2}`);
  console.log(`${num1} - ${num2} = ${num1 - num2}`);
  console.log(`${num1} * ${num2} = ${num1 * num2}`);
  console.log(`${num1} / ${num2} = ${ Math.floor(num1 / num2) }`);
  console.log(`${num1} % ${num2} = ${num1 % num2}`);
  console.log(`${num1} ** ${num2} = ${num1 ** num2}`);
}
calculateNumbers(23, 17);


/*
** 6. Write a function that returns the next to last word in the String passed
** to it as an argument. Words are any sequence of non-blank characters. You may
** assume that the input String will always contain at least two words.
*/
function penultimate(str) {
  let result = str.split(' ');
  return result[result.length - 2];
}
console.log(penultimate("last word") === "last"); // logs true
console.log(penultimate("Launch School is great!") === "is"); // logs true


/*
** 7. In this exercise, you will write a function named xor that takes two
** arguments, and returns true if exactly one of its arguments is truthy,
** false otherwise. Note that we are looking for a boolean result instead
** of a truthy/falsy value as returned by || and &&.
*/
function xor(arg1, arg2) {
  // If only arg1 is true - or - only arg2 is true...
  if ( (arg1 && !arg2) || (arg2 && !arg1) ) {
    return true;
  }
  return false;
}
console.log(xor(5, 0) === true);
console.log(xor(false, true) === true);
console.log(xor(1, 1) === false);
console.log(xor(true, true) === false);


/*
** 8. Write a function that returns an Array that contains every other element
** of an Array that is passed in as an argument. The values in the returned list
** should be those values that are in the 1st, 3rd, 5th, and so on elements of
** the argument Array.
*/
function oddities(arr) {
  let result = [];

  if ( arr.length > 0 ) {
    result = arr.filter( (num, idx) => {
      if ( idx % 2 === 0 ) {
        return num;
      }
    });
  }

  return result;
}
console.log(oddities([2, 3, 4, 5, 6])); // logs [2, 4, 6]
console.log(oddities([1, 2, 3, 4, 5, 6])); // logs [1, 3, 5]
console.log(oddities(["abc", "def"])); // logs ['abc']
console.log(oddities([123])); // logs [123]
console.log(oddities([])); // logs []





/*
** Write a function that converts a non-negative integer value
** (e.g., 0, 1, 2, 3, and so on) to the string representation of that integer.
*/
const integerToString = function(num) {
  let result = [];

  if (num === 0) {
    result.push(`${num}`);
  } else {
    // Example: For the number 5432, the code below produces 3
    let numOfLoops = Math.floor( Math.log10( Math.abs(num) ) );

    for (let counter = numOfLoops; counter >= 0; counter -= 1) {
      // Step 1: Place is set to 1000
      let place = 10 ** counter; // 10 ** 3 = 1000

      // Step 2: Digit is set to 5.432
      // Step 3: Running Digit through Math.floor produces 5
      let digit = Math.floor(num / place); // 5432 / 1000 = 5.432 -> floored to 5

      // Step 4: Push Digit's value to the result array in a template string
      result.push(`${digit}`);

      // Step 5: Num is set to 432
      num -= (digit * place); // 5432 - (5 * 1000) = 432

      // Step 6: Lather, rinse, repeat for all remaining numbers
    }
  }

  return result.join('');
}
console.log(integerToString(5432) === "5432"); // true
console.log(integerToString(10) === "10");
console.log(integerToString(5000) === "5000");
console.log(integerToString(1234567890) === "1234567890");