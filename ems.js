var mysql = require('mysql');
var readline = require('readline-sync');
var emsDao = require('./emsDao');

//function to present menu
var options = function(){
	var choice = readline.question("press 1: to view employee details \npress 2 to insert a new employee \npress 3 to remove an employee \npress 4 to promote an employee\npress 5 to exit");
	switch(choice){
		case '1':
    //to view all records
			emsDao.viewAll(emsDao.execute,options);

			break;
		case '2':
    //validating user
    //inserting new employee by validating all new fields
			emsDao.validate(emsDao.getId , emsDao.addEmployee , options);
			break;
		case '3':
    //validation user
    //checking if the employee to be deleted is present in the database
    //removing the employee with the input id by the user
			emsDao.validate(emsDao.getId , emsDao.removeEmployee , options);
			break;
		case '4':
    //validating user
    //checking if the employee to be promoted is present in the database
    //promoting the employee
			emsDao.validate(emsDao.getId , emsDao.promoteEmployee , options);
			break;
		case '5':
			break;
		default :
			options();
			break;
	}
}
options();
module.exports = {
  options:options
}
