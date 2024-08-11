from backend_app import pb
from flask import Flask
from backend_app import app

@app.errorhandler(404)
def h404(*_):
    return "no", 404

if __name__ == "__main__":
    app.run(debug=False, port=8000)
