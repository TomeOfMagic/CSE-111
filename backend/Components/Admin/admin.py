from flask import request, jsonify, Blueprint
from flask_mysqldb import MySQL
import MySQLdb.cursors
import datetime

admin = Blueprint('admin' , __name__)

mysql = MySQL()

def init(app):
    mysql.init_app(app=app)

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
        return jsonify(msg = 'login successfuly') , 200
    else:
        return jsonify(msg = 'Not Match')
