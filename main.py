from flask import Flask, jsonify, request

from flask_cors import CORS, cross_origin

import pandas as pd

import csv

import json

from waste import store_least_wasted_foods

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def store_least_wasted_foods(data):

  food_wastage_data = {}

  for index, row in data.iterrows():
    food_wastage_data[row['food']] = int(row['wastage'])
  
  
  # Sort and find least wasted foods
  sorted_foods = sorted(food_wastage_data.items(), key=lambda x: x[1])
  least_wasted_foods = [sorted_foods[0], sorted_foods[1], sorted_foods[2], sorted_foods[3]]
  '''
  num_count = 1
  index_count = 0
  first_num = sorted_foods[0][1]
  while (num_count <= 4):
    if (sorted_foods[index_count][1] != first_num):
      first_num = sorted_foods[index_count + 1][1]
      num_count += 1
      least_wasted_foods.append(sorted_foods[index_count][0])
      index_count += 1
  '''
  return least_wasted_foods



@app.route('/', methods=["POST"])
@cross_origin()
def home():
    if request.method == "POST":
      if 'file' not in request.files:
          return jsonify({'error': 'No file provided'}), 400

      file = request.files['file']
      data = pd.read_csv(file)
 
  
      menu = store_least_wasted_foods(data)

      return jsonify({'data': menu}), 200

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080, debug=True)





















