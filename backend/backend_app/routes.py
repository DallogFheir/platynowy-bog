from flask import jsonify
import json
from pathlib import Path
from . import app


def open_resource(resource_name):
    return open(Path(__file__).parent.parent / "resources" / (resource_name + ".json"))


# ITEMS
@app.route("/api/items")
def items():
    with open_resource("items") as f:
        items = json.load(f)

    return jsonify(items)
