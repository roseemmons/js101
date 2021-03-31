// 1. Write a function that rotates an array by moving the first element to the
// end of the array. Do not modify the original array.
// If the input is not an array, return undefined.
// If the input is an empty array, return an empty array.

// Review the test cases below, then implement the solution accordingly.

function rotateArray(arg) {
  let result = null;

  if ( !Array.isArray(arg) ) {
    result = undefined;
  } else if ( Array.isArray(arg) && arg.length === 0 ) {
    result = [];
  } else {
    result = arg.slice();
    let removedItem = result.shift();
    result.push(removedItem);
  }

  console.log(result);
}

rotateArray([7, 3, 5, 2, 9, 1]);       // [3, 5, 2, 9, 1, 7]
rotateArray(['a', 'b', 'c']);          // ["b", "c", "a"]
rotateArray(['a']);                    // ["a"]
rotateArray([1, 'a', 3, 'c']);         // ["a", 3, "c", 1]
rotateArray([{ a: 2 }, [1, 2], 3]);    // [[1, 2], 3, { a: 2 }]
rotateArray([]);                       // []

// return `undefined` if the argument is not an array
rotateArray();                         // undefined
rotateArray(1);                        // undefined


// the input array is not mutated
let arr1 = [1, 2, 3, 4];
rotateArray(arr1);                    // [2, 3, 4, 1]
console.log(arr1);                    // [1, 2, 3, 4]


// 2. Write a function that rotates the last count digits of a number. To perform
// the rotation, move the first of the digits that you want to rotate to the end
// and shift the remaining digits to the left.

function rotateRightmostDigits(numSet, place) {
  let result = numSet.toString().split('');
  let idx = result.length - place;
  let removedItem = result.splice(idx, 1).toString();

  result.push(removedItem);
  result = result.join('');

  console.log( Number(result) );
}

rotateRightmostDigits(735291, 1);      // 735291
rotateRightmostDigits(735291, 2);      // 735219
rotateRightmostDigits(735291, 3);      // 735912
rotateRightmostDigits(735291, 4);      // 732915
rotateRightmostDigits(735291, 5);      // 752913
rotateRightmostDigits(735291, 6);      // 352917


// 3. Take the number 735291 and rotate it by one digit to the left, getting 352917.
// Next, keep the first digit fixed in place and rotate the remaining digits to
// get 329175. Keep the first two digits fixed in place and rotate again to get
// 321759. Keep the first three digits fixed in place and rotate again to get
// 321597. Finally, keep the first four digits fixed in place and rotate the
// final two digits to get 321579. The resulting number is called the maximum
// rotation of the original number.

function maxRotation(numSet) {
  let result = numSet.toString().split('');  // 735291 to ['7', '3', '5', '2', '9', '1']
  let idx = 0;

  while (idx < result.length) {
    let removedItem = result.splice(idx, 1).toString(); // '7'
    result.push(removedItem);  // ['3', '5', '2', '9', '1', '7']
    idx += 1;
  }

  result = Number(result.join(''));
  console.log(result);
}

maxRotation(735291);          // 321579
maxRotation(3);               // 3
maxRotation(35);              // 53
maxRotation(105);             // 15 -- the leading zero gets dropped
maxRotation(8703529146);      // 7321609845