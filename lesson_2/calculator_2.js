const readline = require('readline-sync');
const USER_MSG = require('./calculator_messages.json');
const DEFAULT_LANG = 'en';
let runProgram = 'y';


function getUserMsg(msg, lang = DEFAULT_LANG) {
  return USER_MSG[lang][msg];
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

prompt( getUserMsg('welcome') );

while (runProgram === 'y') {
  prompt( getUserMsg('number1') );
  let number1 = readline.question();
  // Test for invalid entry
  while (invalidNumber(number1)) {
    prompt( getUserMsg('numberError') );
    number1 = readline.question();
  }


  prompt( getUserMsg('number2') );
  let number2 = readline.question();
  // Test for invalid entry
  while (invalidNumber(number2)) {
    prompt( getUserMsg('numberError') );
    number2 = readline.question();
  }


  prompt( getUserMsg('opToPerform') );
  let operation = readline.question();
  // Test for invalid entry
  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt( getUserMsg('operationError') );
    operation = readline.question();
  }


  let output = null;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }
  prompt( getUserMsg('result') );
  prompt(output);


  prompt( getUserMsg('runProgram') );
  runProgram = readline.question().toLowerCase();
  // Test for invalid entry
  while (runProgram[0] !== 'n' && runProgram[0] !== 'y') {
    prompt( getUserMsg('runProgramError') );
    runProgram = readline.question().toLowerCase();
  }
}

prompt( getUserMsg('goodbye') );