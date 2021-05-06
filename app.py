from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import json
import os
import random
import math

from data import Universities 

# Init app
app = Flask(__name__)
cors = CORS(app, resources={r'/api/' : {"origins" : "", "headers" : "Content-Type"}})

Universities = Universities()

def get_paginated_list(data, url, start, limit):

    count = len(data)

    # force numericalize start and limit
    start = int(start)
    limit = int(limit)

    # build json response
    obj = {}
    obj["start"] = start
    obj["limit"] = limit
    obj["count"] = count
    obj["pages"] = math.ceil(count / limit)

    # previous page url
    if start == 1:
        obj["previous"] = ""
    else:
        start_copy = max(1, start - limit)
        obj["previous"] = url + "?start=%d&limit=%d" % (start_copy, limit)

    # next page url
    if start + limit > count:
        obj["next"] = ""
    else:
        start_copy = start + limit
        obj["next"] = url + "?start=%d&limit=%d" % (start_copy, limit)

    # slice json data according to start and limit bound
    obj["data"] = data[(start - 1) : (start - 1 + limit)]
    return obj


# GET all unis  or POST a university
@app.route("/api/universities", methods=["GET", "POST"])
def get():
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
        id = random.random()
        alpha_two_code = request.json['alpha_two_code']
        country = request.json['country']
        domain = request.json['domain']
        name = request.json['name']
        web_page = request.json['web_page']
        description = request.json['description']
        img_url = request.json['img_url']

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

     
    Universities.append(created_university)
    return jsonify(created_university)


# GET a university by ID
@app.route('/api/universities/<id>', methods=['GET'])
def get_a_university(id):
    university = next((uni for uni in Universities if uni['id'] == float(id)), {"status": 404, "message": "Univerity not found"})
    
    return jsonify(university)
# UPDATE a university
@app.route('/api/universities/<id>', methods=['PUT'])
def update_university(id):

    # Find a specific university by ID from the Universities List
    university = next((uni for uni in Universities if uni['id'] == float(id)), {"status": 404, "message": "Univerity not found"})

    university['alpha_two_code'] = request.json['alpha_two_code']
    university['country'] = request.json['country']
    university['domain'] = request.json['domain']
    university['name'] = request.json['name']
    university['web_page'] = request.json['web_page']
    description = request.json['description']
    img_url = request.json['img_url']

    return jsonify(university)

# DELETE a university
@app.route("/api/universities/<id>", methods=["DELETE"])
def delete_university(id):
    university = (uni for uni in Universities if uni["id"] == float(id))
    try:
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
    app.run(debug=True)