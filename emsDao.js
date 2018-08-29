var validation = require('./validation');
var readline = require('readline-sync');
var mysql = require('mysql');
var ems = require('./ems');
var constants = require('./constants');
var promoteId;
var userRoleId;
var sql;
var empId;

//Establishing Connection with the database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ems"
});
con.connect(function(err) {
  if (err) throw err;
  //console.log("Connected!");

});
//getting the designation of user
//only Hr and Ceo can promote employees
//if user is at higher designation than the employee to be promoted then promoting the employee
var promoteEmployee = function(callBack){

  		var id = readline.question("Enter the Id of the employee to be promoted\n");
  		validation.validateId(id,presentId,function(){
  			var sql_temp = `select emp_role_id from employee where id = '${id}'`;
  			con.query(sql_temp,function(err,response){
  			if (err) throw err;
  			promoteId = response[0].emp_role_id;
  			if(userRoleId >2 && userRoleId > promoteId && promoteId<3)
  			{
  				promoteId+=1;
  				sql = `UPDATE employee set emp_role_id =  '${promoteId}' where id = '${id}'`;
  				execute(sql,function(){
            callBack();
          });
  			}else
  			console.log("Invalid Operation");
          callBack();

  	});

		});

}
//checking if the employee to be removed is present in the database
//checking if the user's designation is hr or Ceo,only they can remove employees
//higher designation employee can remove employee with lower designation
var removeEmployee = function(callBack){
	if(userRoleId > 2)
	{
		var id = readline.question("Enter the Id of the employee to be deleted\n");
		validation.validateId(id,presentId,function(){
      var sql_temp = `select emp_role_id from employee where id = '${id}'`;
      con.query(sql_temp,function(err,response){
        if (err) throw err;
        removeId = response[0].emp_role_id;
        if(removeId<userRoleId){
          sql = `DELETE FROM employee where id = '${id}' `;
          execute(sql,function(){
            callBack();
          });
        }
        else {
          console.log("Invalid Operation");
          callBack();
        }
      })

		});
    }
    else{
    	console.log("Invalid Operation");
        callBack();

    }
}
//getting the designation of the user
//Hr and Ceo can add an employee
//user's designation should be greater than the designation of the new employee
var addEmployee = function(callBack){
	if(userRoleId > 2)
	{
		var name = readline.question(constants.INPUT_NAME);
		name = validation.validateName(name);
  		var mobile = readline.question(constants.INPUT_PHONE);
  		mobile = validation.validatePhone(mobile);
  		var salary = readline.question(constants.INPUT_SALARY);
  		salary = validation.validateNum(salary);
  		var password = readline.question(constants.INPUT_PASSWORD);
  		var role_id = readline.question(constants.INPUT_ROLE);
  		role_id = validation.validateRoleId(role_id);
  		var manager_id = readline.question(constants.INPUT_MANAGER);
  		manager_id = validation.validateNum(manager_id);
      validation.validateId(manager_id,presentId,function(){
        getId(manager_id,function(){
          if(userRoleId>role_id){
            sql = `INSERT INTO employee (name, mobile,salary,password,emp_role_id,manager_id) VALUES ( '${name}' , '${mobile}' , '${salary}' , '${password}' , '${role_id}' , '${manager_id}')`;
            execute(sql,function(){
              callBack();
            });
          }
          else{
            console.log("Invalid Operation");
              callBack();
          }
        });
      });
	}
	else{
		console.log("Invalid Operation",function(){
      callBack();
    });
	}
}
//Anyone can view basic details of the employees
var viewAll = function(callBack,callBack2){
	sql =  `select employee.id,employee.name ,employee.mobile,role.role_name from role inner join employee on employee.emp_role_id=role.role_id`;
  	callBack(sql,callBack2);
}
//validating user
//checking if the password corresponding to the input id is correct
var validate = function(callBack,callBack2,callBack3){

	var userId = readline.question("Enter your ID");
  userId = validation.validateNum(userId);
	var password = readline.question("Enter your password");
	sql = `select password from employee where id = '${userId}'`;
	con.query(sql, function (err, result) {
    if (err)
    console.log("Wrong Input");
    else
    {
    	var checkPassword = result[0].password;
		if(checkPassword == password)
			callBack(userId,callBack2,callBack3);
		else{
			console.log("wrongPassword");
      callBack3();
		}
	}
  });


}
//geting designation from the input id
var getId = function(id,callBack,callBack2){
	sql = `select emp_role_id from employee where id = '${id}'`;
	 	con.query(sql,function(err,response){
  		if (err) throw err;
  		userRoleId = response[0].emp_role_id;
  		callBack(callBack2);

  	});

}

//checking if the employee with the id exists in the database
var presentId = function(id,callBack){
	sql = `select * from employee where id ='${id}'`;
	con.query(sql, function (err, result) {
    if (err)
    	throw err;
  	else{
  		if(result.length>0)
  			callBack();
  		else
      {
  			console.log("Employee with this Id is not present in database\n");
      }

	}

  })
}
//Executes sql queries
var execute = function(sql,callBack){
 con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Operation Successfull!!");
    console.log(result);
    callBack();
    //return result;
  });
}
module.exports = {
  execute:execute,
  presentId:presentId,
  getId:getId,
  validate:validate,
  viewAll:viewAll,
  addEmployee:addEmployee,
  removeEmployee:removeEmployee,
  promoteEmployee:promoteEmployee
}
