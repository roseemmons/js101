
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