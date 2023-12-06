from flask import *
from Components.config import *
from Components.Admin.admin import *
from flask_cors import CORS


app = Flask(__name__)

app.config.from_object(Configuration)

init(app=app)


CORS(app , supports_credentials= True)

app.register_blueprint(admin)


##################################################################

if __name__ == '__main__':
    
    app.run(debug=True , host='localhost' , port=8080)