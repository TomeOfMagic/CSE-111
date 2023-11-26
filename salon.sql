
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

SELECT * FROM employee;

UPDATE admin SET password = '123ttr' WHERE username = 'admin1';
DELETE FROM admin WHERE username = 'admin34';

SELECT username , password From admin;

SELECT shiftservices.ss_employid , shiftservices.ss_serviceid , shiftservices.service_date , employee.employ_fname , service.nameservice
From shiftservices
JOIN employee on employee.employID = shiftservices.ss_employid
JOIN service on service.serviceID = shiftservices.ss_serviceid;

SELECT tip.tip_amount , tip.tip_date , payrate.hourly_rate , employee.employ_fname FROM tip
JOIN employee on employee.employID = tip.employID
JOIN payrate on employee.employID = payrate.p_employID;

INSERT INTO tip (tip_amount , tip_date , employID) VALUES
('$40' , '2023/03/15' , 2);
SELECT payrate.hourly_rate  , employee.employ_fname , employee.employ_lname
FROM payrate
JOIN employee on employee.employID = payrate.payrateID
GROUP BY payrate.payrateID
Having payrate.hourly_rate <= 20;

DELETE FROM payrate WHERE payrate.hourly_rate <= 30;