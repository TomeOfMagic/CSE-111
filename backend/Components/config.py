from datetime import timedelta

class Configuration:
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:123giadinh@localhost/salonmanagement" 
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = '123giadinh'
    JWT_COOKIE_SECURE = True
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    SECRET_KEY = '123giadinh'
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = '123giadinh'
    MYSQL_PORT = 3306
    MYSQL_DB = 'salonmanagement'