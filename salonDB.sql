CREATE DATABASE SalonManagement;

USE SalonManagement;

CREATE TABLE Admin (
    username VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL
);

CREATE TABLE Employee (
    employID INT AUTO_INCREMENT PRIMARY KEY,
    employ_fname VARCHAR(200) NOT NULL,
    employ_lname VARCHAR(200) NOT NULL,
    employ_phone VARCHAR(200) NOT NULL
);

CREATE TABLE Tip (
    tipID INT AUTO_INCREMENT PRIMARY KEY,
    tip_amount VARCHAR(200) NOT NULL,
    tip_date DATETIME NOT NULL,
    employID INT NOT NULL,
    FOREIGN KEY (employID) REFERENCES Employee(employID)
);

CREATE TABLE PayRate (
    payrateID INT AUTO_INCREMENT PRIMARY KEY,
    p_employID INT NOT NULL,
    hourly_rate INT NOT NULL,
    FOREIGN KEY (p_employID) REFERENCES Employee(employID)
);

CREATE TABLE Service (
    serviceID INT AUTO_INCREMENT PRIMARY KEY,
    nameservice VARCHAR(200) NOT NULL,
    description VARCHAR(200) NOT NULL,
    price VARCHAR(200) NOT NULL
);

CREATE TABLE ShiftServices (
    ss_employid INT NOT NULL,
    ss_serviceid INT NOT NULL,
    ss_tipID INT NOT NULL,
    service_date DATE NOT NULL,
    FOREIGN KEY (ss_employid) REFERENCES Employee(employID),
    FOREIGN KEY (ss_serviceid) REFERENCES Service(serviceID),
    FOREIGN KEY (ss_tipID) REFERENCES Tip(tipID)
);

CREATE TABLE Customer (
    customerID INT AUTO_INCREMENT PRIMARY KEY,
    custUser VARCHAR(200) NOT NULL,
    custPass VARCHAR(200) NOT NULL
);

CREATE TABLE CheckIn (
    cinID INT AUTO_INCREMENT PRIMARY KEY,
    cinCustname VARCHAR(200) NOT NULL,
    cin_time TIME NOT NULL
);

CREATE TABLE PointEarn (
    p_customerID INT NOT NULL,
    p_checkinID INT NOT NULL,
    p_point INT NOT NULL,
    FOREIGN KEY (p_customerID) REFERENCES Customer(customerID),
    FOREIGN KEY (p_checkinID) REFERENCES CheckIn(cinID)
);


# Insert QUERY

INSERT INTO admin (username , password) VALUES
('admin1' , '123456') , 
('admin2' , '123456');

INSERT INTO customer (custUser , custPass) VALUES
('custname1' , '1234'), 
('custname2' , '1234'),
('custname3' , '1234');

INSERT INTO employee (employ_fname , employ_lname , employ_phone) VALUES
('employ1first', 'employ1last' , '4005674322') ,
('employ2first', 'employ2last' , '40056743244');

INSERT INTO checkin(cinCustname , cin_time) VALUES 
('custname1' , '10:00') , 
('custname2' , '9:15');

INSERT INTO payrate (p_employID , hourly_rate) VALUES 
(1 , 20) , (2 , 40) , (3 , 20);

INSERT INTO pointearn (p_customerID , p_checkinID , p_point) VALUES
( 1 , 1 , 1) , 
( 2 , 2 , 1),
( 3 , 3 , 1);

INSERT INTO service (nameservice , description , price) VALUES(
    'Pedicure Deluxe' , 'This is Sample Deluxe Pedi' , '$50'
);

INSERT INTO shiftservices (ss_employid , ss_serviceid , ss_tipID , service_date) VALUES(
    1 , 1 , 1 , '11/08/23'
);

INSERT INTO tip (tip_amount , tip_date , employID) VALUES (
    '$20' , '23/12/2' , 1
);

