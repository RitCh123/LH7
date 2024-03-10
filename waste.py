def store_least_wasted_foods(data):

  food_wastage_data = {row['food']: int(row['wastage']) for index, row in data.iterrows()}
  
  # Sort and find least wasted foods
  sorted_foods = sorted(food_wastage_data.items(), key=lambda x: x[1])
  least_wasted_foods = []
  num_count = 1
  index_count = 0
  first_num = sorted_foods[0][1]
  while (num_count <= 4):
    if (sorted_foods[index_count][1] != first_num):
      first_num = sorted_foods[index_count + 1][1]
      num_count += 1
      least_wasted_foods.append(sorted_foods[index_count][0])
      index_count += 1
  return least_wasted_foods



  
