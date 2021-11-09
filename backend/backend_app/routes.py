from flask import jsonify, render_template
import json
from pathlib import Path
from . import app


def open_resource(resource_name):
    return open(
        Path(__file__).parent.parent / "resources" / (resource_name + ".json"),
        encoding="utf-8",
    )


# main site
@app.route("/")
def home():
    return app.send_static_file("index.html")


# API docs
@app.route("/apidocs")
def apidocs():
    return app.send_static_file("apidocs.html")


# error handlers
@app.errorhandler(404)
def error_404(error):
    error_code = error.code
    message = "Nie znaleziono strony."

    return render_template("error.html", error_code=error_code, message=message), 404


@app.errorhandler(500)
def error_500(error):
    error_code = error.code
    message = "Wystąpił błąd ze strony serwera. Spróbuj ponownie później."

    return render_template("error.html", error_code=error_code, message=message), 500


# ITEMS
@app.route("/api/items")
def items():
    with open_resource("items") as f:
        items = json.load(f)

    return jsonify(sorted(items.values(), key=lambda k: k["id"]))


@app.route("/api/items/<id>")
def items_id(id):
    with open_resource("items") as f:
        items = json.load(f)

    return jsonify(items[id])


# TRINKETS
@app.route("/api/trinkets")
def trinkets():
    with open_resource("trinkets") as f:
        trinkets = json.load(f)

    return jsonify(sorted(trinkets.values(), key=lambda k: k["id"]))


@app.route("/api/trinkets/<id>")
def trinkets_id(id):
    with open_resource("trinkets") as f:
        trinkets = json.load(f)

    return jsonify(trinkets[id])
