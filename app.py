from flask import Flask, request, jsonify, Response
import json
import os
import random

from data import Universities 

# Init app
app = Flask(__name__)

Universities = Universities()

# University Class/Model
# class Univeristy:
#     def __init__(self, id, alpha_two_code, country, domain, name, web_page):
#         self.id = id
#         self.alpha_two_code = alpha_two_code
#         self.country = country
#         self.domain = domain
#         self.name = name
#         self.web_page = web_page
#     def toJson(self):
#         return json.dumps(self,default=lambda o: o.__dict__,sort_keys=True, indent=4)


# GET all universities
@app.route('/api/university', methods=['GET'])
def get():
    universities = Universities
    return jsonify(universities)

# CREATE a new university
@app.route('/api/university', methods=['POST'])
def add_university():
    # print (request.json)
    length_of_universities_list = len(Universities)
    id = random.random()
    alpha_two_code = request.json['alpha_two_code']
    country = request.json['country']
    domain = request.json['domain']
    name = request.json['name']
    web_page = request.json['web_page']

    # created_university = Univeristy(id, alpha_two_code, country, domain, name, web_page)
    # created_university_JSON = created_university.toJson()
    # new_univeristy_list = Universities.append({
    #     created_university_JSON
    # })

    create_obj = {
        "id": id,
        "alpha_two_code" : alpha_two_code,
        "country" : country,
        "domain": domain,
        "name": name,
        "web_page": web_page
    }

     
    Universities.append(create_obj)
    # Universities.insert(length_of_universities_array, create_obj)
    # new_universities = Universities

    # print(create_obj)
    return jsonify(Universities)

# UPDATE a university
@app.route('/api/university/<id>', methods=['PUT'])
def update_university(id):
    # Find a specific university by ID from the Universities List
    # print(id)
    
    university = next((uni for uni in Universities if uni['id'] == float(id)), {"status": 404, "message": "Univerity not found"})

    university['alpha_two_code'] = request.json['alpha_two_code']
    university['country'] = request.json['country']
    university['domain'] = request.json['domain']
    university['name'] = request.json['name']
    university['web_page'] = request.json['web_page']
    return jsonify(university)
    # for uni in Universities:
    #     if uni['id'] == int(id):
    #         university = uni
    #         university['alpha_two_code'] = request.json['alpha_two_code']
    #         university['country'] = request.json['country']
    #         university['domain'] = request.json['domain']
    #         university['name'] = request.json['name']
    #         university['web_page'] = request.json['web_page']
    #         return jsonify(university)

#DELETE a university
@app.route('/api/university/<id>', methods=['DELETE'])
def delete_university(id):
     university = next((uni for uni in Universities if uni['id'] == float(id)), {"status": 404, "message": "Univerity not found"})
     Universities.remove(university) 
     return jsonify(Universities)

# Run Server
if __name__ == '__main__':
    app.run(debug=True)