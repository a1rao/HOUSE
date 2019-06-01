// // Require: npm install request, npm install node-fetch --save
// const fetch = require("node-fetch");
// const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Regents+La+Jolla&destinations=University+of+California+San+Diego&key=AIzaSyBTD132iHKIXtMExAf6ZOfX9AMWFAaRm6Y'
//
//
// var request = require('request');
//
// // Request api
// request(url, function(error, response, body){
// 	if(response){
// 		console.log("Ststus code: " + response.statusCode);
// 		console.log(body);
// 	}
// 	else{
// 		console.log(error);
// 	}
// });
//
// /*
// fetch(request)
// 	.then(response => {
// 		if (response.status === 200){
// 			console.log(response);
// 		} else{
// 			throw new Error('Wrong');
// 		}
// 	}).catch(error => {
// 		console.error('Error');
// 	});
// 	*/
