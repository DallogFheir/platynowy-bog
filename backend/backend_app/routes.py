from flask import abort, jsonify, make_response, render_template
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
    error_trinket = "iVBORw0KGgoAAAANSUhEUgAAAC0AAAATCAYAAAAEaoRHAAAAlElEQVR4nN2WQQ6AMAgErfFB/v9z9dQe1uCyAZvQvSkIMqC03YesDtdNDxGLeyYlXKrrw/YXUZaHvsc2pFnlTOx51jHa0W1Io0bl6uxl+80OlCetzjLrAM5mdNanypO2ZBHyEsb7aryXvSzp6H95tepuRPbVstlFewe7FcfKS/3KklaFlTPi6dqWtPfs4d2A3s1n+j2IJB1ktIHadgAAAABJRU5ErkJggg=="

    return (
        render_template(
            "error.html", error_code=error_code, message=message, icon=error_trinket
        ),
        404,
    )


@app.errorhandler(500)
def error_500(error):
    error_code = error.code
    message = "Wystąpił błąd ze strony serwera. Spróbuj ponownie później."
    broken_modem = "iVBORw0KGgoAAAANSUhEUgAAADUAAAAvCAYAAABDq4KNAAAB5klEQVR4nO2ZO07DQBCG/0UpCBJCQjwUiYIiDRegQdyAguNAhahANFyFghtENHAAmpRIEQ/RUERUS/VH9tibWa/XDlr7q7xydrKZT7szsY21FlUYGpObMLfWVArQAmurXkATGF9TNHR1cwsAuL68yN3/T8Z6U9mxy5hkFQa7bYpIY760aSxJU4OqE3wzHmo0Br2pZbjM9KdfJAqmYu0FlyEtfgyzSZpa1Km6hrQMNx0/S5Km1NOvqbp0dHwCANjZ2wUAfH18AgBen58qxS9bX5KmvPeUzEisU1Iak2gGy9aXtikSakDLONEyXzfO3FqTpKng3i80o5wn45C6pofG2CRNqaefrxHCTBJm9PTsPGiBLjMH43Fu/DadLq7TNLUO5AxVNeMLMx5aj2hmNBoBAGazWW78MpksPpukqcLpJzMVy5zcW9peoQFCM+T+dwsAcFfyXd0wJetGrMpPJo8PubHLjGSZGUk3TJGf73cARXNE65olvkZ8uTvcAFDca0Cippx1iqY2t/dLxy5oUDMj64wvnJftILJ0r0vXjGi4Kr+8r6GZIcn/8x3wF7JLd3UUoeZiGyHLnnKlaYoX0hhxmatLTDOStE0R7fmerzlZ6Zsw4iJJU629nXfRxJvG3lQZvubafPf7B7y+JRQK/uuwAAAAAElFTkSuQmCC"

    return (
        render_template(
            "error.html", error_code=error_code, message=message, icon=broken_modem
        ),
        500,
    )


# ITEMS
@app.route("/api/items")
def items():
    with open_resource("items") as f:
        items = json.load(f)

    sorted_items = sorted(items.values(), key=lambda k: k["id"])
    resp = make_response(jsonify(sorted_items))
    resp.headers["Access-Control-Allow-Origin"] = "*"

    return resp


@app.route("/api/items/<id>")
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
@app.route("/api/trinkets")
def trinkets():
    with open_resource("trinkets") as f:
        trinkets = json.load(f)

    sorted_trinkets = sorted(trinkets.values(), key=lambda k: k["id"])
    resp = make_response(jsonify(sorted_trinkets))
    resp.headers["Access-Control-Allow-Origin"] = "*"

    return resp


@app.route("/api/trinkets/<id>")
def trinkets_id(id):
    with open_resource("trinkets") as f:
        trinkets = json.load(f)

    trinket = trinkets.get(id)
    if trinket is None:
        abort(404)

    resp = make_response(jsonify(trinket))
    resp.headers["Access-Control-Allow-Origin"] = "*"

    return resp


@app.route("/api/transformations")
def transformations():
    with open_resource("transformations") as f:
        transformations = json.load(f)

    sorted_keys = sorted(int(k) for k in transformations)
    sorted_transformations = [transformations[str(k)] for k in sorted_keys]
    resp = make_response(jsonify(sorted_transformations))
    resp.headers["Access-Control-Allow-Origin"] = "*"

    return resp


@app.route("/api/transformations/<id>")
def transformations_id(id):
    with open_resource("transformations") as f:
        transformations = json.load(f)

    print(id)
    transformation = transformations.get(id)
    if transformation is None:
        abort(404)

    resp = make_response(jsonify(transformation))
    resp.headers["Access-Control-Allow-Origin"] = "*"

    return resp
