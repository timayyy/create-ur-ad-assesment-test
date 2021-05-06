from flask import Flask, request, jsonify, Response,send_from_directory
from flask_cors import CORS
import json
import os
import random

# import the Universities function
from data import Universities 

# import the pagination function
from pagination import get_paginated_list

# Init app
app = Flask(__name__,static_folder='./frontend/build',static_url_path='/')
cors = CORS(app, resources={r'/api/' : {"origins" : "", "headers" : "Content-Type"}})

# Call the Universities function and store list in a variable 
Universities = Universities()

@app.route('/')
def serve():
    return send_from_directory(app.static_folder,'index.html')

# GET all universities or POST a university
@app.route("/api/universities", methods=["GET", "POST"])
def get():
    # GET all universities
    if request.method == "GET":
        universities = Universities

        return jsonify(
            get_paginated_list(
                universities,
                "/api/universities",
                request.args.get("start", 1),
                request.args.get("limit", 2),
            )
        )
    else:
        # CREATE a new university
        id = random.random()
        alpha_two_code = request.json['alpha_two_code']
        country = request.json['country']
        domain = request.json['domain']
        name = request.json['name']
        web_page = request.json['web_page']
        description = request.json['description']
        img_url = request.json['img_url']

    # build university object from the request sent
    created_university = {
        "id": id,
        "alpha_two_code" : alpha_two_code,
        "country" : country,
        "domain": domain,
        "name": name,
        "web_page": web_page,
        "description" : description,
        "img_url" : img_url
    }

    # append the newly created university to the existing universities list 
    Universities.append(created_university)
    # return the newly created univeersity
    return jsonify(created_university)


# GET a university by ID
@app.route('/api/universities/<id>', methods=['GET','PUT','DELETE'])
def get_a_university(id):
    print(request.method)
    if request.method == "GET":
        university = next((uni for uni in Universities if uni['id'] == float(id)), {"status": 404, "message": "Univerity not found"})
        
        return jsonify(university)
    elif request.method == "PUT":
        # UPDATE a specific university
        # Find a specific university by ID from the Universities List
        university = next((uni for uni in Universities if uni['id'] == float(id)), {"status": 404, "message": "Univerity not found"})

        university['alpha_two_code'] = request.json['alpha_two_code']
        university['country'] = request.json['country']
        university['domain'] = request.json['domain']
        university['name'] = request.json['name']
        university['web_page'] = request.json['web_page']
        description = request.json['description']
        img_url = request.json['img_url']

        # return the updated university
        return jsonify(university)
    else:
        # DELETE a specific university

        # Find a specific university by ID from the Universities List 
        university = (uni for uni in Universities if uni["id"] == float(id))
        try:
            # Remove the university from the Universities List 
            Universities.remove(next(university))
            return {"status": 204, "success": True, "message": "University removed"}
        except StopIteration:
            return {
                "status": 404,
                "success": False,
                "message": "University matching that id was not found",
            }

            
#Search a university
@app.route('/api/universities/search/<search_term>', methods=['GET'])
def search_university(search_term):
    search_results = []
    for uni in Universities:
        if search_term in uni['name'].lower():
            search_results.append(uni)
        else:
            pass

    return jsonify(get_paginated_list(
                search_results,
                f"/api/universities/search/{search_term}",
                request.args.get("start", 1),
                request.args.get("limit", 2),
            ))


#Filter University by Country Code
@app.route('/api/universities/search/filter/<country_code>', methods=['GET'])
def filter_university(country_code):
    search_results = []
    for uni in Universities:

        if country_code.upper() in uni['alpha_two_code']:
            search_results.append(uni)
        else:
            pass


    return jsonify(get_paginated_list(
                search_results,
                f"/api/universities/search/filter/{country_code}",
                request.args.get("start", 1),
                request.args.get("limit", 2),
            ))


# Run Server
if __name__ == '__main__':
    app.run(debug=False)