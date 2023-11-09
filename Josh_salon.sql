USE SalonManagement;

select employee.employ_fname, employee.employ_lname, employee.employ_phone, employee.employID, employee.employ_Hours, employee.employ_Hours * payrate.hourly_rate as "end of week pay" from employee
join payrate
where employee.employID = 1 and employee.employID = payrate.p_employID; #user input to show there data

update employee set employ_fname = 'Dave', employ_lname = 'Fern', employ_phone = 6508675309 where employid = 1; #updating values to user input

select employee.employ_fname, employee.employ_lname, employee.employ_phone, employee.employID, employee.employ_Hours, employee.employ_Hours * payrate.hourly_rate as "end of week pay" from employee
join payrate
where employee.employID = 1 and employee.employID = payrate.p_employID; #user input to show there data

select employee.employID, employee.employ_Hours from employee;

update employee set employ_Hours = 30
where employee.employID = 1; #update employee hours worked

select employee.employID, employee.employ_Hours from employee;

select payrate.p_employID, payrate.hourly_rate * employee.employ_Hours as "end of week pay" from payrate
join employee where employee.employID = p_employID;  # display employee pay at the end of week

update pointearn set pointearn.p_point = pointearn.p_point + 1 where pointearn.p_customerID = 2;

insert into employee (employ_fname , employ_lname , employ_phone, employ_Hours) VALUES
('employ4first', 'employ4last' , '6508736749', 0);

insert into payrate (p_employID, hourly_rate) values
(4, 10);

select pointearn.p_point from pointearn where pointearn.p_customerID = 1