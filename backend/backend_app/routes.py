import json
from pathlib import Path

from flask import Blueprint, abort, jsonify, make_response, send_file

pb = Blueprint(
    "pb",
    __name__,
    static_folder=Path(__file__).parent / "build" / "static",
    static_url_path="/static",
    template_folder=Path(__file__).parent.parent / "templates",
)

BUILD_PATH = Path(__file__).parent / "build"


def open_resource(resource_name):
    return open(
        Path(__file__).parent.parent / "resources" / (resource_name + ".json"),
        encoding="utf-8",
    )


# main site
@pb.route("/")
def home():
    return send_file(BUILD_PATH / "index.html")


# API docs
@pb.route("/apidocs")
def apidocs():
    return send_file(BUILD_PATH / "apidocs.html")


# favicon
@pb.route("/favicon.ico")
def favicon():
    return send_file(BUILD_PATH / "favicon.ico")


# ITEMS
@pb.route("/api/items")
def items():
    with open_resource("items") as f:
        items = json.load(f)

    sorted_items = sorted(items.values(), key=lambda k: k["id"])
    resp = make_response(jsonify(sorted_items))
    resp.headers["Access-Control-Allow-Origin"] = "*"

    return resp


@pb.route("/api/items/<id>")
def items_id(id):
    with open_resource("items") as f:
        items = json.load(f)

    item = items.get(id)
    if item is None:
        abort(404)

    resp = make_response(jsonify(item))
    resp.headers["Access-Control-Allow-Origin"] = "*"

    return resp


# TRINKETS
@pb.route("/api/trinkets")
def trinkets():
    with open_resource("trinkets") as f:
        trinkets = json.load(f)

    sorted_trinkets = sorted(trinkets.values(), key=lambda k: k["id"])
    resp = make_response(jsonify(sorted_trinkets))
    resp.headers["Access-Control-Allow-Origin"] = "*"

    return resp


@pb.route("/api/trinkets/<id>")
def trinkets_id(id):
    with open_resource("trinkets") as f:
        trinkets = json.load(f)

    trinket = trinkets.get(id)
    if trinket is None:
        abort(404)

    resp = make_response(jsonify(trinket))
    resp.headers["Access-Control-Allow-Origin"] = "*"

    return resp


# PILLS
@pb.route("/api/pills")
def pills():
    with open_resource("pills") as f:
        pills = json.load(f)

    sorted_keys = sorted(int(k) for k in pills)
    sorted_pills = [pills[str(k)] for k in sorted_keys]
    resp = make_response(jsonify(sorted_pills))
    resp.headers["Access-Control-Allow-Origin"] = "*"

    return resp


@pb.route("/api/pills/<id>")
def pills_id(id):
    with open_resource("pills") as f:
        pills = json.load(f)

    pill = pills.get(id)
    if pill is None:
        abort(404)

    resp = make_response(jsonify(pill))
    resp.headers["Access-Control-Allow-Origin"] = "*"

    return resp


# CARDS/RUNES
@pb.route("/api/cards-runes")
def cards_runes():
    with open_resource("cards-runes") as f:
        cards_runes = json.load(f)

    sorted_keys = sorted(int(k) for k in cards_runes)
    sorted_cards_runes = [cards_runes[str(k)] for k in sorted_keys]
    resp = make_response(jsonify(sorted_cards_runes))
    resp.headers["Access-Control-Allow-Origin"] = "*"

    return resp


@pb.route("/api/cards-runes/<id>")
def cards_runes_id(id):
    with open_resource("cards-runes") as f:
        cards_runes = json.load(f)

    card_rune = cards_runes.get(id)
    if card_rune is None:
        abort(404)

    resp = make_response(jsonify(card_rune))
    resp.headers["Access-Control-Allow-Origin"] = "*"

    return resp


# TRANSFORMATIONS
@pb.route("/api/transformations")
def transformations():
    with open_resource("transformations") as f:
        transformations = json.load(f)

    sorted_keys = sorted(int(k) for k in transformations)
    sorted_transformations = [transformations[str(k)] for k in sorted_keys]
    resp = make_response(jsonify(sorted_transformations))
    resp.headers["Access-Control-Allow-Origin"] = "*"

    return resp


@pb.route("/api/transformations/<id>")
def transformations_id(id):
    with open_resource("transformations") as f:
        transformations = json.load(f)

    transformation = transformations.get(id)
    if transformation is None:
        abort(404)

    resp = make_response(jsonify(transformation))
    resp.headers["Access-Control-Allow-Origin"] = "*"

    return resp


# PICKUPS
@pb.route("/api/pickups")
def pickups():
    with open_resource("pickups") as f:
        pickups = json.load(f)

    values = []
    for subdict in pickups.values():
        if subdict.get("groupId") in [
            41,
            50,
            60,
            360,
            51,
            53,
            52,
            54,
            55,
            56,
            57,
            58,
            390,
        ]:
            values.append(subdict)
        else:
            values.extend(subdict.values())

    sorted_pickups = sorted(
        values, key=lambda k: (k["groupId"], k["id"] if "id" in k else 0)
    )
    resp = make_response(jsonify(sorted_pickups))
    resp.headers["Access-Control-Allow-Origin"] = "*"

    return resp


@pb.route("/api/pickups/<group_id>")
def pickups_group_id(group_id):
    with open_resource("pickups") as f:
        pickups = json.load(f)

    pickup_group = pickups.get(group_id)
    if pickup_group is None or isinstance(list(pickup_group.values())[0], dict):
        abort(404)

    resp = make_response(jsonify(pickup_group))
    resp.headers["Access-Control-Allow-Origin"] = "*"
    return resp


@pb.route("/api/pickups/<group_id>/<id>")
def pickups_id(group_id, id):
    with open_resource("pickups") as f:
        pickups = json.load(f)

    pickup_group = pickups.get(group_id)
    if pickup_group is None:
        abort(404)
    pickup = pickup_group.get(id)
    if pickup is None:
        abort(404)

    resp = make_response(jsonify(pickup))
    resp.headers["Access-Control-Allow-Origin"] = "*"
    return resp
