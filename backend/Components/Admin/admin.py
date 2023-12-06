from flask import request, jsonify, Blueprint
from flask_mysqldb import MySQL
import json
import datetime
import random
from datetime import timedelta , timezone
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt, get_jwt_identity, unset_jwt_cookies
import MySQLdb.cursors
import json
import datetime

admin = Blueprint('admin' , __name__)

jwt = JWTManager()

mysql = MySQL()
jwt = JWTManager()

def init(app):
    mysql.init_app(app=app)
    jwt.init_app(app)
    
@admin.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.datetime.now(timezone.utc)
        target_timestamp = datetime.datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response
    
# @admin.route("/scripInsert")
# def scriptInsert():
    
#     cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    
#     for i in range(1 , 9):
        
#         hours =  str(random.randint(10,50))
            
#         cursor.execute(
#             """
#                 INSERT INTO tip (tip_amount , tip_date , employID) \
#                 VALUES (%s , %s , %s);
#             """ , (hours, datetime.datetime.now() , i)    
#         )
#     mysql.connection.commit()

#     return jsonify(msg = 'Insert Complete')


@admin.route("/admin/register", methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    
    cursor.execute(
        'SELECT username FROM Admin WHERE username = %s ;' , (username,)
    )
    
    check = cursor.fetchone()
    
    if check:
        
        return jsonify(msg = 'Account Already Register')
    
    else:
        
        cursor.execute(
            'INSERT INTO Admin (username , password) VALUES (%s , %s);' , (username , password)
        )
        
        mysql.connection.commit()
        
        access_token = create_access_token(identity=username)
        
        return jsonify(msg = 'Successfully Register' , access_token=access_token)
    

@admin.route("/admin/login", methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
            'SELECT username , password FROM Admin WHERE username = %s \
                AND password = %s;' , (username , password)
            )
    check = cursor.fetchone()
    if check:
        access_token = create_access_token(identity=username)
        return jsonify(access_token = access_token , msg = 'login successfuly') , 200
    else:
        return jsonify(msg = 'Not Match')
    
@admin.route("/admin/getData1" , methods = ['GET'])
@jwt_required(locations=['headers'])
def getData1():
    
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'SELECT (SELECT COUNT(*) FROM Customer) AS customer, \
            (SELECT COUNT(*) FROM Employee) AS employee, \
            (SELECT COUNT(*) FROM Service) AS service;'
    )
    
    data = cursor.fetchone()
        
    return jsonify(data = data)

@admin.route("/admin/graphData" , methods = ['GET'])
@jwt_required(locations=['headers'])
def graphData():
    
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    
    cursor.execute(
        """
            SELECT employee.employ_fname, 
                (payrate.hourly_rate * employee.employ_Hours) + COALESCE(CAST( tip.tip_amount AS UNSIGNED), 0) AS 'end of week pay'
            FROM employee
            JOIN payrate ON employee.employID = payrate.p_employID
            LEFT JOIN tip ON employee.employID = tip.employID
        """
    )


    data = cursor.fetchall()

    end_of_week_pay = []
    employ_ids = []

    for i in data:
        end_of_week_pay.append(i['end of week pay'])
        employ_ids.append(i['employ_fname'])

    return jsonify({"data": end_of_week_pay, "categories": employ_ids})

@admin.route("/admin/employee" , methods = ['GET' , 'POST' , 'DELETE'])
@jwt_required(locations=['headers'])
def getemployee():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    
    if request.method == 'GET':  
        cursor.execute(
            """
                SELECT employee.* , COALESCE(CAST(tip.tip_amount AS UNSIGNED), 0) AS tip_amount , 
                payrate.hourly_rate
                FROM employee
                JOIN payrate ON payrate.p_employID = employee.employID
                LEFT JOIN tip ON employee.employID = tip.employID;
            """
        )
        data = cursor.fetchall()
        print(data)
        return jsonify(data = data)
    
    elif request.method == 'DELETE':
        
        data = request.get_json()
        id = data.get('id')
        
        cursor.execute(
            """
                DELETE FROM payrate WHERE p_employID = %s;
            """, (id,)
        )

        cursor.execute(
            """
                DELETE FROM employee WHERE employID = %s;
            """, (id,)
        )
        
        mysql.connection.commit()
        
        return jsonify(msg = 'Delete Successfully')
        
        
        
        
