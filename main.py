from chatbot import respond
from flask import Flask, render_template, request
from replit import db

app = Flask(__name__)
app.static_folder = "static"

@app.route("/")
def home():
  return render_template("index.html")

@app.route("/get")
def get_bot_response():
  try:
    userText = request.args.get("message")
    db["conversations"] += 1
    return str(respond(userText))
  except:
    return ""

@app.route("/total")
def get_total_responses():
  return str(db["conversations"])


if __name__ == "__main__":
  app.run(host="0.0.0.0", port=8080)