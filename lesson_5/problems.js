function evenValues(array) {
  let result = [];

  array.forEach(value => {
    if (value % 2 === 0) {
      result.push(value);
    }
  });

  return result;
}
evenValues([1, 3, 4, 2, 4, 6, 5, 7, 9, 10, 12]);


//#1
let arr = ['10', '11', '9', '7', '8'];
arr.sort( (a,b) => parseInt(b) - parseInt(a) );

//#2
let books = [
  { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
  { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
  { title: 'Ulysses', author: 'James Joyce', published: '1922' },
  { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },
];
books.sort( (a, b) => parseInt(a.published) - parseInt(b.published) );


//#3
// For each of these collection objects, demonstrate how you would access the letter g.
let arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g'] ] ];
arr1[2][1][3];

let arr2 = [{ first: ['a', 'b', 'c'], second: ['d', 'e', 'f'] }, { third: ['g', 'h', 'i']}];
arr2[1]['third'][0];

let arr3 = [['abc'], ['def'], { third: ['ghi'] }];
arr3[2]['third'][0][0];

let obj1 = { a: ['d', 'e'], b: ['f', 'g'], c: ['h', 'i'] };
obj1['b'][1];

let obj2 = { first: { d: 3 }, second: { e: 2, f: 1 }, third: { g: 0 }};
Object.keys(obj2.third)[0];

//#4
// For each of these collection objects, demonstrate how you would change the value 3 to 4.
let arr1 = [1, [2, 3], 4];
arr1[1][1] = 4;

let arr2 = [{ a: 1 }, { b: 2, c: [7, 6, 5], d: 4 }, 3];
arr2[2] = 4;

let obj1 = { first: [1, 2, [3]] };
obj1['first'][2][0] = 4;

let obj2 = { a: { a: ['1', 'two', 3], b: 4 }, b: 5 };
obj2['a']['a'][2] = 4;

//#5
// Compute and display the total age of the male members of the family.
let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};
Object.entries(munsters).filter( el => el[1]['gender'] === 'male' ).map( el => el[1]['age'] ).reduce( (accumulator, currentValue) => accumulator + currentValue );
/*
** Object.entries(munsters).filter( el => el[1]['gender'] === 'male' ) returns:
** [
**   [ 'Herman', { age: 32, gender: 'male' } ],
**   [ 'Grandpa', { age: 402, gender: 'male' } ],
**   [ 'Eddie', { age: 10, gender: 'male' } ]
** ]
**
** Next we create an array of ages by accessing the age property:
** .map( el => el[1]['age'] )
** Which returns a new array of:
** [ 32, 30, 402, 10, 23 ]
**
** We then use reduce to add the ages up:
** .reduce( (accumulator, currentValue) => accumulator + currentValue );
** Which returns 497
*/

//#6
// Given this previously seen family object, print the name, age, and gender of
// each family member like so: Herman is a 32-year old male.
Object.entries(munsters).forEach( el => console.log(`${el[0]} is a ${el[1]['age']}-year old ${el[1]['gender']}.`) );

//#8
// Using the forEach method, write some code to output all vowels from the
// strings in the arrays. Don't use a for or while loop.
let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};
Object.values(obj).forEach( function(ary) {
  ary.forEach( function(word) {
    word.split('').forEach( function(letter) {
      if ( 'aeiouAEIOU'.includes(letter) ) {
        console.log(letter);
      }
    });
  });
});

//#9
// Return a new array with the same structure, but with the subarrays ordered
// alphabetically or numerically -- as appropriate -- in ascending order.
let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];
let newArr = arr.map( function(subArr) {
  let result = null;

  if (typeof subArr[0] === 'string') {
    result = subArr.sort();
  } else {
    result = subArr.sort( (a,b) => a - b );
  }

  return result;
});

//#10
// Now sort the elements in descending order.
// My solution:
let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];
let newArr = arr.map( function(subArr) {
  let result = null;

  if (typeof subArr[0] === 'string') {
    result = subArr.sort().reverse();
  } else {
    result = subArr.sort( (a,b) => b - a );
  }

  return result;
});

// Course solution:
arr.map(subArr => {
  return subArr.slice().sort((a, b) => {
    if (typeof a === 'number') {
      return b - a;
    }

    if (a < b) {
      return 1
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
});

//#11
// Use the map method to return a new array identical in structure to the original
// but, with each number incremented by 1.
// ** Do not modify the original data structure. **

// My Solution
let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];
let newArr = arr.map( function(obj) {
  let objToArr = Object.entries(obj);

  objToArr.map( function(subArr) {
    subArr[1] += 1;
  });
  
  return Object.fromEntries(objToArr);
});

// Course Solution
let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];
arr.map(obj => {
  let incrementedObj = {};
  for (let key in obj) {
    incrementedObj[key] = obj[key] + 1;
  }
  return incrementedObj;
});

//#12
// Use a combination of methods, including filter, to return a new array identical
// in structure to the original, but containing only the numbers that are multiples
// of 3.
let arr = [ [2], [3, 5, 7], [9], [11, 15, 18] ];
let newArr = arr.map( function(subArr) {
  let result = subArr.filter(function(el) {
    if (el % 3 === 0) {
      return el;
    }
  });
  return result;
});

//#13
// sort the array so that the sub-arrays are ordered based on the sum of the
// odd numbers that they contain.
let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];
arr.sort( function(a, b) {
  let sumOfA = a.filter(num => num % 2 === 1)
                .reduce( ( acc, curr ) => acc + curr, 0 );
  let sumOfB = b.filter(num => num % 2 === 1)
                .reduce( ( acc, curr ) => acc + curr, 0 );
  return sumOfA - sumOfB;
});

//#14
// Write some code to return an array containing the colors of the fruits and
// the sizes of the vegetables. The sizes should be uppercase, and the colors
// should be capitalized.

let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

function captialize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

Object.values(obj).map( function(val) {
  let result = null;

  if (val['type'] === 'fruit') {
    result = val['colors'].map( function(el) {
      return captialize(el);
    });
  } else {
    result = val['size'].toUpperCase();
  }

  return result;
});

//#15
// Write some code to return an array which contains only the objects where all
// the numbers are even.
let arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];
arr.filter( function(obj) {
  return Object.values(obj).every( function(subArr) {
    return subArr.every( function(el) {
      return el % 2 === 0;
    });
  });
});

//#16
// Write some code that returns an object where the key is the first item in
// each subarray, and the value is the second.
let arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];
let newObj = {};
arr.forEach( function(subArr) {
  let key = subArr[0];
  let value = subArr[1];
  newObj[key] = value;
});
console.log(newObj);
// { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }

//#17
function generateUUID() {
  let hexChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  let sections = [8, 4, 4, 4, 12];
  let result = [];
  
  for (let i = 0; i < sections.length; i += 1) {
    let sectionLength = sections[i];
  
    for (let j = 0; j < sectionLength; j += 1) {
      let hexIndex = Math.floor( Math.random() * (hexChars.length) );
      result.push(hexChars[hexIndex]);
    }
    
    if (i !== sections.length - 1) {
      result.push('-');
    }
  }

  return result.join('');
}


function evenValues(array) {
  let evens = [];
  let counter = 0;

  array.forEach(value => {
    console.log('The counter is: ' + counter);
    console.log('The value is: ' + value);
    if (value % 2 === 0) {
      evens.push(value);
    }
    console.log('The evens array is: ' + evens);
    console.log('The number shifted is: ' + array.shift());
    console.log('The array is now: ' + array + '\n');
    counter += 1;
  });

  return evens;
}

evenValues([1, 3, 4, 2, 4, 6, 5, 7, 9, 10, 12]);
