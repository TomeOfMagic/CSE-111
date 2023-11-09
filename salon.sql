
USE SalonManagement;

SELECT * FROM employee

UPDATE admin SET password = '123ttr' WHERE username = 'admin1';
DELETE FROM admin WHERE username = 'admin34'

SELECT username , password From admin

SELECT shiftservices.ss_employid , shiftservices.ss_serviceid , shiftservices.service_date , employee.employ_fname , service.nameservice
From shiftservices
JOIN employee on employee.employID = shiftservices.ss_employid
JOIN service on service.serviceID = shiftservices.ss_serviceid

SELECT tip.tip_amount , tip.tip_date , payrate.hourly_rate , employee.employ_fname FROM tip
JOIN employee on employee.employID = tip.employID
JOIN payrate on employee.employID = payrate.p_employID

INSERT INTO tip (tip_amount , tip_date , employID) VALUES
('$40' , '2023/03/15' , 2)

SELECT payrate.hourly_rate  , employee.employ_fname , employee.employ_lname
FROM payrate
JOIN employee on employee.employID = payrate.payrateID
GROUP BY payrate.payrateID
Having payrate.hourly_rate <= 20

DELETE FROM payrate WHERE payrate.hourly_rate <= 30