function doubleOddNumbers(numbers) {
  let doubledNums = [];

  for (let counter = 0; counter < numbers.length; counter += 1) {
    let currentNumber = numbers[counter];

    if ( counter % 2 === 1 ) {
      doubledNums.push(currentNumber * 2);
    } else {
      doubledNums.push(currentNumber);
    }
  }

  return doubledNums;
}


let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];


function aryToObj(ary) {
  let result = {};

  ary.forEach( function(val, idx) {
    result[val] = idx;
  } );

  return result;
}
aryToObj(flintstones);


let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

Object.values(ages).reduce( function(accumulator, currentValue) {
  return accumulator + currentValue;
} );


// Create an object that expresses the frequency with which each letter 
// occurs in this string:
let statement = "The Flintstones Rock";

// The output will look something like the following:
// { T: 1, h: 1, e: 2, F: 1, l: 1, ... }



let splitStr = statement.split('');
let result = {};
splitStr.forEach( function(currentValue) {
  if ( result.hasOwnProperty(currentValue) ) {
    result[currentValue] += 1;
  } else {
    result[currentValue] = 1;
  }
} );


let result = {};
statement.split('').forEach( function(currentValue) {
  if ( result.hasOwnProperty(currentValue) ) {
    result[currentValue] += 1;
  } else {
    result[currentValue] = 1;
  }
} );
console.log(result);


someArr.map( function(el) {
  // throw 'Parameter is not a number!';
  return el * 2;
} );

const obj = { a: 'able', b: 'baker', c: 'charley' };
result = Object.values(obj).map(value => value.toUpperCase());
