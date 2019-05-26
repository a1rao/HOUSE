const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inp;
rl.on('line', (input) => {
    console.log(`Received--------------------------------------------------------------------------------: ${input}`);
    inp = input
});

function hello() {
    console.log(inp);
}
setTimeout(hello, 10000)
// var readlineSync = require('readline-sync');
//
// // Wait for user's response.
// var userName = readlineSync.question('May I have your name? ');
// console.log('Hi ' + userName + '!');
//
// // Handle the secret text (e.g. password).
// var favFood = readlineSync.question('What is your favorite food? ', {
//     hideEchoBack: true // The typed text on screen is hidden by `*` (default).
// });
// console.log('Oh, ' + userName + ' loves ' + favFood + '!');