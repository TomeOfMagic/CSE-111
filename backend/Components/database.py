from flask_sqlalchemy import SQLAlchemy
import json
import pymysql


db = SQLAlchemy()

class Admin(db.Model):
    id = db.Column(db.Integer , primary_key = True)
    username = db.Column(db.String(200) , nullable = False)
    password = db.Column(db.String(200) , nullable = False)
    
    def __init__(self, username , password):
        self.username = username
        self.password = password
        
class Employee(db.Model):
    
    employID = db.Column(db.Integer , primary_key = True)
    employ_fname = db.Column(db.String(200) , nullable = False)
    employ_lname = db.Column(db.String(200) , nullable = False)
    employ_phone = db.Column(db.String(200) , nullable = False)
    employ_Hours = db.Column(db.Integer)
    tip = db.relationship("Tip" , uselist=False , backref = 'employee')
    
    def __init__(self)
    
class Tip(db.Model):
    tipID = db.Column(db.Integer , primary_key = True)
    tip_amount = db.Column(db.String(200) , nullable = False)
    tip_date = db.Column(db.Datetime , nullable = False)
    tip_employID = db.Column(db.Integer, db.ForeignKey('employee.employID'))

class PayRate(db.Model):
    payrateID = db.Column(db.Integer , primary_key = True)
    p_employID = db.Column(db.Integer , db.ForeginKey('employee.employID'))
    hourly_rate = db.Column(db.Integer , nullable = False)
def int__app(app):
    db.__init__(app)