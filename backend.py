from flask import Flask, jsonify, make_response, request
from pymongo import MongoClient
from bson import ObjectId
import uuid, random
from flask_cors import CORS
import json
import bcrypt
import jwt
import datetime
from pathlib import Path
from functools import wraps

#from importlib_metadata import re 
##yest
 
app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'mysecret'
 
client = MongoClient("mongodb://127.0.0.1:27017")

db = client.SafeToEat
users = db.users
blacklist = db.blacklist

def jwt_required(func):
    @wraps(func)
    def jwt_required_wrapper(*args, **kwargs):
        # token = request.args.get('token')
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify( {'message': 'Token is missing'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify( {'message' : 'Token is invalid'}), 401
        return func(*args, **kwargs)

    return jwt_required_wrapper

@app.route("/api/v1.0/users", methods=["GET"])
@jwt_required
def show_all_users():
    page_num, page_size = 1, 10
    if request.args.get('pn'):
        page_num = int(request.args.get('pn'))
    if request.args.get('ps'):
        page_size = int(request.args.get('ps'))
    page_start = (page_size * (page_num - 1))
 
    data_to_return = []
    for user in users.find().skip(page_start).limit(page_size):
        user['_id'] = str(user['_id'])
        for details in users.find():
            details['_id'] = str(details['_id'])
        data_to_return.append(user)    
 
    return make_response( jsonify( data_to_return ), 200)

# get user
@app.route("/api/v1.0/users/<_id>", methods=["GET"])
# @jwt_required
def show_one_user(_id):
    user = users.find_one({'_id':ObjectId(_id)})
    if user is not None:
        user["_id"] = str(user['_id'])
        return make_response( jsonify( user ), \
         200 )
    else:
        return make_response(  jsonify( {"error" : "Invalid user ID"} ), 404 )

# creating account
@app.route("/api/v1.0/users/createUser", methods=["POST"])
# @jwt_required
def add_user():
    if "first_name" in request.form and "last_name" in request.form and "email_address" in request.form and "password" in request.form and "allergy" in request.form:
        new_user = {"first_name": request.form["first_name"],
                    "last_name": request.form["last_name"],
                    "email_address": request.form["email_address"],
                    "password": request.form["password"],
                    "allergy": request.form["allergy"]
                    }
        new_user_id = users.insert_one(new_user)
        new_user_link = "http://localhost:5000/api/v1.0/users/createUser" + str(new_user_id.inserted_id)
        return make_response( jsonify( { "url" : new_user_link}), 200)

    # users.append(new_user)
    # return make_response( jsonify( new_user ), 201) 

# editing account details
@app.route("/api/v1.0/users/<_id>", methods=["PUT"])
@jwt_required
def edit_user(_id):
    if "first_name" in request.form and "last_name" in request.form and "email_address" in request.form and "password" in request.form and "allergy" in request.form:
        result = users.update_one(
            { "_id" : ObjectId(_id) }, {
                "$set" : { "first_name" : request.form["first_name"],
                            "last_name": request.form["last_name"],
                            "email_address": request.form["email_address"],
                            "password": request.form["password"],
                            "allergy": request.form["allergy"]}
            }
        )
        if result.matched_count == 1:
            edited_user_link = "http://localhost:5000/api/v1.0/users/" + _id
            return make_response( jsonify( { "url":edited_user_link }), 200)
#     for user in users:
#         if user["id"] == id:
#             user["first_name"] = request.form["first_name"]
#             user["last_name"]: request.form["last_name"]
#             user["email_address"]: request.form["email_address"]
#             user["password"]: request.form["password"]
#             user["allergy"]: request.form["allergy"]
#             break
#     return make_response( jsonify( user ), 200)



# deleting account
@app.route("/api/v1.0/users/<_id>", methods=["DELETE"])
@jwt_required
def delete_user(_id):
    result = users.delete_one( { "_id" : ObjectId(_id)})
    if result.deleted_count == 1:
        return make_response( jsonify( {} ), 204)
    else:
        return make_response( jsonify( {"error": "Invalid user ID"}), 404)
    # for user in users:
    #     if user["id"] == id:
    #         users.remove(user)
    #         break
    # return make_response( jsonify( {} ), 200)

# auth user login
@app.route('/api/v1.0/login', methods=['GET'])
def login():
    auth = request.authorization
    if auth:
        hashed = bcrypt.hashpw(auth.password.encode('utf-8'), bcrypt.gensalt())

        user = users.find_one({'username': auth.username})
        if user is not None:
            if bcrypt.checkpw(user["password"].encode('utf-8'), hashed):
                token = jwt.encode({'user': auth.username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
                return make_response(jsonify({'token': token.decode('UTF-8')}), 200)
            else:
                return make_response(jsonify({'message': 'Bad password'}), 401)
        else:
            return make_response(jsonify({'message': 'Bad username'}), 401)
    else:
        return make_response(jsonify({'message': 'Authentication required'}), 401)

# @app.route('/api/v1.0/login', methods=['GET'])
# def login():
#     auth = request.authorization
#     if auth:
#         user = users.find_one( { 'username':auth.username } )
#         if user is not None:
#             if bcrypt.checkpw(bytes(auth.password, 'UTF-8'), \
#                             user["password"]):
#                 token = jwt.encode( {
#                     'user' : auth.username, 
#                     'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
#                 }, app.config['SECRET_KEY'])
#                 return make_response(jsonify({'token' : token.decode('UTF-8')}),200)

#     return make_response('Could not verify', 401, \
#         {'WWW-Authenticate' : 'Basic realm = "Login required" '})
        

# logout
@app.route('/api/v1.0/logout', methods=["GET"])
# @jwt_required
def logout():
    token = request.headers['x-access-token']
    blacklist.insert_one({"token":token})
    return make_response(jsonify({'message' : 'Logout successful'}), 200)


if __name__ == "__main__":
    #businesses = generate_dummy_data()
    app.run(debug=True)
