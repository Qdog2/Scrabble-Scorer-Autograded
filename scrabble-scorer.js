// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //


function simpleScorer(word) {
   let score = 0;
   word = word.toLowerCase();  
   for (let i = 0; i < word.length; i++) {
      if (word === word.toLowerCase()) {
      score++
      }
   }
   return score;
}

function vowelBonusScorer(word) {
   word = word.toLowerCase();
   let score = 0;
  let vowels = ['a', 'e', 'i', 'o', 'u']; 

   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         score +=3
      } else {
         score +=1
      }
}
return score;
}


function initialPrompt() {
   let answer = input.question("Let's play some scrabble! Enter a word: ");
   let output = vowelBonusScorer(answer);
   return answer;
}

let newPointStructure = transform(oldPointStructure);

function scrabbleScorer(word, newPointStructure) {
   newPointStructure = transform(oldPointStructure);
   score = 0;
   word = word.toLowerCase();
   for (let i = 0; i < word.length; i++) {
      score += newPointStructure[word[i]]; 
   }
   return score;
}



const scoringAlgorithms = [{
   user: 'Simple Score',
   description: 'Each letter is worth 1 point',
   scorerFunction: simpleScorer
},

{
   user: 'Bonus Vowels',
   description: 'Vowels are 3 pts. and consonants are 1pt.',
   scorerFunction: vowelBonusScorer
},

{
   user: 'Scrabble',
   description: 'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer
}];




function scorerPrompt(word) {
   let userInput = input.question(`What scoring algorithm would you like to use?
   0 - ${scoringAlgorithms[0].user}: ${scoringAlgorithms[0].description}
   1 - ${scoringAlgorithms[1].user}: ${scoringAlgorithms[1].description}
   2 - ${scoringAlgorithms[2].user}: ${scoringAlgorithms[2].description}
   Enter 0, 1, or 2: `)
   return scoringAlgorithms[userInput];

}

function transform(oldPointStructure) {
   let newObject = {};
   
   for (const key in oldPointStructure) {
      for (const letter of oldPointStructure[key]) {
         newObject[letter.toLowerCase()] = Number(key);
      }
   }
   return newObject;
}



function runProgram() {
   let word = initialPrompt();
   let object = scorerPrompt();
   console.log(object.scorerFunction(word));
}



// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
