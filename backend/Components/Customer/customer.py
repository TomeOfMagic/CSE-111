from flask import request, jsonify, Blueprint
import datetime
from datetime import timedelta , timezone
from Admin.admin import *
from Components.database import *

customer = Blueprint('customer' , __name__)


