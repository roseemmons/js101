/*
** Question 4
** Using the following string, create a new string that contains all lowercase
** letters except for the first character, which should be capitalized.
*/
let munstersDescription = "the Munsters are CREEPY and Spooky.";
let newMunsters = munstersDescription.charAt(0).toUpperCase() + munstersDescription.toLowerCase().slice(1);


/*
** Question 6
** We have most of the Munster family in our ages object:
*/
let ages = { Herman: 32, Lily: 30, Grandpa: 5843, Eddie: 10 };

// Add entries for Marilyn and Spot to the object:
let additionalAges = { Marilyn: 22, Spot: 237 };
let newAges = Object.assign(ages, additionalAges);


/*
** Question 7
** Determine whether the name Dino appears in the strings below -- check each
** string separately):
*/
let str1 = "Few things in life are as important as house training your pet dinosaur.";
let str2 = "Fred and Wilma have a pet dinosaur named Dino.";
str1.includes("Dino");
str2.includes("Dino");


/*
** Question 8
** How can we add the family pet, "Dino", to the following array?
*/
let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"];
flintstones.push("Dino");


/*
** Question 9
** How can we add multiple items to our array? ('Dino' and 'Hoppy')
*/
let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"];
flintstones.push("Dino", "Hoppy");


/*
** Question 10
** Return a new version of this sentence that ends just before the word house.
** Don't worry about spaces or punctuation: remove everything starting from the
** beginning of house to the end of the sentence.

** Expected return value:
** => 'Few things in life are as important as '
*/
let advice = "Few things in life are as important as house training your pet dinosaur.";
advice.slice(0, 39);