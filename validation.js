var readline = require('readline-sync');

//function to validate contact number that can have exactly 10 digits
validatePhone = function(phone){
	console.log("inside");
	var regex = /^\d{10}$/;
	while(!(regex.test(phone)))
		phone = readline.question("Incorrect Format of phone\nPlease enter again\n");
	return phone;

}
//Function to validate name
//taking input again and again untill correct input is found
validateName = function(name){
	var regex = /[a-zA-Z][a-zA-Z ]*$/;
	while(!regex.test(name))
		name = readline.question("Incorrect Format of name\nPlease enter again\n");
	return name;

}
//Function to validate entities that can have only numerical format
validateNum = function(num){
	var regex = /^\d*$/;
	while(!regex.test(num))
		num = readline.question("Incorrect Format\nPlease enter again\n");
	return num;
}
//validating Role id which can be only 1,2,3,4
validateRoleId = function(num){
	while(!(num == 1 || num == 2 || num == 3))
		num = readline.question("Incorrect Format\nPlease enter again\n");
	return num;
}
validateId = function(id,callBack,callBack2){
	var regex = /^\d*$/;
	while(!regex.test(id))
		id = readline.question("Incorrect Format\nPlease enter again\n");
	callBack(id,callBack2);
}
module.exports = {
	validateId:validateId,
	validateNum:validateNum,
	validateRoleId:validateRoleId,
	validatePhone:validatePhone,
	validateName:validateName
}
