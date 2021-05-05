from flask import Flask, request, jsonify, Response
import json
import os
import random

from data import Universities 

# Init app
app = Flask(__name__)

Universities = Universities()


# GET all universities
@app.route('/api/university', methods=['GET'])
def get():
    universities = Universities
    return jsonify(universities)

# CREATE a new university
@app.route('/api/university', methods=['POST'])
def add_university():
    id = random.random()
    alpha_two_code = request.json['alpha_two_code']
    country = request.json['country']
    domain = request.json['domain']
    name = request.json['name']
    web_page = request.json['web_page']

    create_obj = {
        "id": id,
        "alpha_two_code" : alpha_two_code,
        "country" : country,
        "domain": domain,
        "name": name,
        "web_page": web_page
    }

     
    Universities.append(create_obj)
    return jsonify(Universities)

# UPDATE a university
@app.route('/api/university/<id>', methods=['PUT'])
def update_university(id):
    # Find a specific university by ID from the Universities List
    
    university = next((uni for uni in Universities if uni['id'] == float(id)), {"status": 404, "message": "Univerity not found"})

    university['alpha_two_code'] = request.json['alpha_two_code']
    university['country'] = request.json['country']
    university['domain'] = request.json['domain']
    university['name'] = request.json['name']
    university['web_page'] = request.json['web_page']

    return jsonify(university)

#DELETE a university
@app.route('/api/university/<id>', methods=['DELETE'])
def delete_university(id):
    university = next((uni for uni in Universities if uni['id'] == float(id)), {"status": 404, "message": "Univerity not found"})
    Universities.remove(university) 
    return jsonify(Universities)

#Search a university
@app.route('/api/university/search/<search_term>', methods=['GET'])
def search_university(search_term):
    search_results = []
    for uni in Universities:
        if search_term in uni['name'].lower():
            search_results.append(uni)
        else:
            pass

    return jsonify(search_results)


#Filter University by Country Code
@app.route('/api/university/search/filter/<country_code>', methods=['GET'])
def filter_university(country_code):
    search_results = []
    for uni in Universities:

        if country_code.upper() in uni['alpha_two_code']:
            search_results.append(uni)
        else:
            pass

    return jsonify(search_results)


# Run Server
if __name__ == '__main__':
    app.run(debug=True)