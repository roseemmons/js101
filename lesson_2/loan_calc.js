/*
** Assignment: Mortgage / Car Loan Calculator

** You'll need three pieces of information:
** - The loan amount
** - The Annual Percentage Rate (APR)
** - The loan duration

** From the above, you'll need to calculate the following two things:
** - The monthly interest rate
** - The loan duration in months
*/

// VARIABLES
const readline = require('readline-sync');
let loanAmount = null;
let interestRate = null;
let loanDurationInMonths = null;
let runProgram = 'n';


// FUNCTIONS
function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

function formatAPR(str) {
  // Readline captures inputs as strings.
  // We coerce the percentage input to a Number type.
  // Finally, we divide our coerced number by 100 to get its decimal value.
  console.log(`You entered a percentage of ${str}%.\n`);
  return parseFloat(str) / 100;
}

function formatLoanAmount(str) {
  // Readline captures inputs as strings.
  // We coerce the loan amount input to a Number type.
  // Finally, we limit our coerced number to two decimal points and round.
  const result = Number(str).toFixed(2);
  console.log(`You entered an amount of $ ${result}.\n`);
  return result;
}

function formatLoanDuration(str) {
  // Readline captures inputs as strings.
  // We coerce the loan amount input to a Number type.
  // Finally, we limit our coerced number to zero decimal points and round.
  const result = Number(str).toFixed(0);
  console.log(`You entered a duration of ${result} months.\n`);
  return result;
}

function calculateLoanPayment(newLoanAmount, newInterestRate, newLoanDurationInMonths) {
  let result = newLoanAmount * (newInterestRate / ( 1 - Math.pow( (1 + newInterestRate), (-newLoanDurationInMonths) ) ) );
  return result.toFixed(2);
}

function mainProgram() {
  // Get Interest Rate
  prompt("Please enter an interest rate percentage for the loan. Example: 12.5");
  interestRate = readline.question();
  // Test for invalid entry
  while ( invalidNumber(interestRate) ) {
    prompt("Please enter a properly formatted percentage.");
    interestRate = readline.question();
  }
  interestRate = formatAPR(interestRate);


  // Get Loan Amount
  prompt("Please enter an amount for the loan. Example: 10000.00");
  loanAmount = readline.question();
  // Test for invalid entry
  while ( invalidNumber(loanAmount) ) {
    prompt( "Please enter a properly formatted amount." );
    loanAmount = readline.question();
  }
  loanAmount = formatLoanAmount(loanAmount);


  // Get Loan Duration
  prompt("Please enter the loan duration in months. Example: 48");
  loanDurationInMonths = readline.question();
  // Test for invalid entry
  while ( invalidNumber(loanDurationInMonths) ) {
    prompt( "Please enter a properly formatted length." );
    loanDurationInMonths = readline.question();
  }
  loanDurationInMonths = formatLoanDuration(loanDurationInMonths);


  // Calculate Payment
  let monthlyPayment = calculateLoanPayment(loanAmount, interestRate, loanDurationInMonths);
  prompt(`Thank you for choosing us for your loan!\nYour monthly payment is ${monthlyPayment}.\n`);


  // Process Another Loan?
  prompt("Would you like to process another loan? (y or n)");
  runProgram = readline.question().toLowerCase();
  // Test for invalid entry
  while (!['y', 'n'].includes(runProgram)) {
    prompt("Please enter a properly formatted response.");
    runProgram = readline.question().toLowerCase();
  }
}

do {
  mainProgram();
} while (runProgram === 'y');

prompt("Thank you for using Loan Calc. Good-bye!");