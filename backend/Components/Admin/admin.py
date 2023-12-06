from flask import request, jsonify, Blueprint
from flask_mysqldb import MySQL
import json
import datetime
from datetime import timedelta , timezone
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt, get_jwt_identity, unset_jwt_cookies
import MySQLdb.cursors
import datetime

admin = Blueprint('admin' , __name__)

jwt = JWTManager()

mysql = MySQL()

def init(app):
    mysql.init_app(app=app)
    jwt.init_app(app=app)
    

@admin.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.datetime.now(timezone.utc)
        target_timestamp = datetime.datetime.timestamp(
            now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response



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
        return jsonify(msg = 'login successfuly' , access_token=access_token) , 200
    
    else:
        return jsonify(msg = 'Not Match')
