function isAnEmptyString(str) {
  return str.length === 0;
}

function hasFourOctets(ary) {
  return ary.length === 4;
}

function isWithinRange(str) {
  let result = false;
  let num = parseInt(str);

  if (num >= 0 && num <= 255) {
    result = true;
  }

  return result;
}


function isValidIpAddress(inputString) {
  let octets = null;
  let result = false;

  // If the input string has a value,
  // split by '.'
  if ( !isAnEmptyString(inputString) ) {
    octets = inputString.split(".");
  }

  if ( hasFourOctets(octets) ) {
    let octetCheck = [];

    octets.forEach(function(octet) {
      if ( isWithinRange(octet) ) {
        octetCheck.push("valid");
      } else {
        octetCheck.push("invalid");
      }
    });

    // If the octetCheck array does not include
    // the value of invalid, set the result to
    // true.
    if ( !octetCheck.includes("invalid") ) {
      result = true;
    }
  }

  return result;
}

console.log( isValidIpAddress("255.1.1.0") );