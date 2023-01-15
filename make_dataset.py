from flask import Flask, request, jsonify, make_response
from pymongo import MongoClient
import json
import bcrypt
import jwt
import datetime
from pathlib import Path
from bson import ObjectId
from functools import wraps

app = Flask(__name__)

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.SafeToEat
users = db.users

def create_database():
    with open('users.json') as f:
        parsed_json = json.load(f)

    for item in parsed_json:
            users.insert_one(item)
    print("Users loaded")


if __name__ == "__main__":
    #movies = generate_dummy_data()
    app.run(create_database())