from flask import Flask, render_template, request
from datetime import datetime
from pprint import pprint

from werkzeug.wrappers import response

app = Flask(__name__)

# The in-memory database, because I'm stuck on a plane and can't install sqllite
database = [
  {
    "id": 0,
    "text": "Todo number 1",
    "date": datetime.now()
  }
]

def add_todo(todo):
  database.append({
    "id": len(database),
    "text": todo,
    "date": datetime.now()
  })


@app.route('/', methods=['POST', 'GET'])
def index():
  if (request.method == "POST"):
    task_content = request.form['content']
    add_todo(task_content)
    print("\n\ndatabase:")
    pprint(database)
  else:
    pass

  return render_template("index.html")


@app.route('/delete/<int:id>', methods=["DELETE"])
def delete(id):
  print('hit the delete route')
  pprint(request)
  return "hit the delete route"



@app.route('/update')
def update():
  print('hit the update route')
  return "hit the update route"

if __name__ == "__main__":
  app.run(debug=True)