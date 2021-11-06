from flask import jsonify
import json
from pathlib import Path
from . import app

# TODO remove sleep
from time import sleep


def open_resource(resource_name):
    return open(
        Path(__file__).parent.parent / "resources" / (resource_name + ".json"),
        encoding="utf-8",
    )


# ITEMS
@app.route("/api/items")
def items():
    with open_resource("items") as f:
        items = json.load(f)

    return jsonify(items.values())


@app.route("/api/items/<id>")
def items_id(id):
    with open_resource("items") as f:
        items = json.load(f)

    return jsonify(items[id])
