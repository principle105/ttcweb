# importing dependencies
import json,random,re
from fuzzywuzzy import fuzz

def respond(userInput):

  with open("data.json", "r") as f:
    data = json.load(f)

  userInput = userInput.replace("^","**")

  # solving any equations
  equation_responses = ["the answer is {}","i think it is {}","it is {} of course"]
  equation = re.findall(r"([\d+\-*\/\(\)])",userInput)
  answer = ""
  if len(equation) >= 3 and any(x in ["+","-","*","/","(",")"] for x in equation):
    try:
      answer = eval("".join(equation))
      b = equation_responses[random.randint(0,len(equation_responses)-1)].format(answer)
    except:
      pass
  
  if answer == "":
    mostsimilar,score = "",0

    for d in data:
      if (s := fuzz.ratio(userInput,d)) > score:
        mostsimilar,score = d,s

    with open("data.json", "w") as f:
      json.dump(data,f,indent=4)

    if score > 5:
      b = data[mostsimilar][random.randint(0,len(data[mostsimilar])-1)]
    else:
      b = "i don't understand what you are saying"
  return b
