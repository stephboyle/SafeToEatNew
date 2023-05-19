# from flask import Flask, jsonify, make_response, request
# from pymongo import MongoClient
# from bson import ObjectId
# import uuid, random
# from flask_cors import CORS
# import json
# import bcrypt
# import jwt
# import datetime
# from pathlib import Path
# from functools import wraps
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_bcrypt import Bcrypt

# app = Flask(__name__)

# client = MongoClient("mongodb://127.0.0.1:27017")

# db = client.SafeToEat
# users = db.users
# products = db.products

# @app.route("/api/v1.0/users/<_id>", methods=["GET"])
# # @jwt_required
# # def show_one_user(_id):
# #     user = users.find_one({'_id':ObjectId(_id)})
# #     if user is not None:
# #         user["_id"] = str(user['_id'])
# #         return make_response( jsonify( user ), \
# #          200 )
# #     else:
# #         return make_response(  jsonify( {"error" : "Invalid user ID"} ), 404 )
    
# # @app.route("/api/v1.0/products/<string:barcode>", methods=["GET"])
# # def get_product(barcode):
# #     result = products.find_one({'barcode' : barcode})
# #     if result is not None:
# #         products["_id"] = str(products['_id'])
# #         return make_response( jsonify( products), 200)
# #         # output = {
# #         #     'id': str(result['_id']),
# #         #     'info' : result['info'],
# #         #     'ingredients' : result['ingredients'],
# #         #     'allergens' : result['allergens']
# #         # }
# #     else:
# #         # output = 'Product not found'
# #         return make_response( jsonify( {"error": "Product not found"}), 404)

# # @app.route("/api/v1.0/products/<string:barcode>", methods=["GET"])
# # def get_product(barcode):
# #     products = products.db.products
# #     result = products.find_one({'barcode' : barcode})
# #     if result:
# #         output = {
# #             'id': str(result['_id']),
# #             'info' : result['info'],
# #             'ingredients' : result['ingredients'],
# #             'allergens' : result['allergens']
# #         }
# #     else:
# #         output = 'Product not found'
# #     return jsonify(output)

# # get user
# # @app.route("/api/v1.0/barcodes/<_id>", methods=["GET"])
# # # @jwt_required
# # def show_product(_id):
# #     product = products.find_one({'_id':ObjectId(_id)})
# #     if product is not None:
# #         product["_id"] = str(product['_id'])
# #         return make_response( jsonify( product ), \
# #          200 )
# #     else:
# #         return make_response(  jsonify( {"error" : "Invalid barcode"} ), 404 )



# if __name__ == '__main__':
#     app.run(debug=True)