from flask import request, jsonify, Blueprint
from flask_mysqldb import MySQL
from datetime import timezone , timedelta
from flask_jwt_extended import create_access_token, JWTManager , jwt_required, get_jwt, get_jwt_identity, unset_jwt_cookies
import MySQLdb.cursors
import json
import datetime

admin = Blueprint('admin' , __name__)

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
