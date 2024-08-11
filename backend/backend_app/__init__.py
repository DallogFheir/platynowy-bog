from pathlib import Path

from flask import Flask, make_response, render_template

from .routes import pb

app = Flask(
    __name__,
)

app.register_blueprint(pb, url_prefix="/platynowy-bog")


# error handlers
@app.errorhandler(404)
def error_404(error):
    error_code = error.code
    message = "Nie znaleziono strony."
    error_trinket = "iVBORw0KGgoAAAANSUhEUgAAAC0AAAATCAYAAAAEaoRHAAAAlElEQVR4nN2WQQ6AMAgErfFB/v9z9dQe1uCyAZvQvSkIMqC03YesDtdNDxGLeyYlXKrrw/YXUZaHvsc2pFnlTOx51jHa0W1Io0bl6uxl+80OlCetzjLrAM5mdNanypO2ZBHyEsb7aryXvSzp6H95tepuRPbVstlFewe7FcfKS/3KklaFlTPi6dqWtPfs4d2A3s1n+j2IJB1ktIHadgAAAABJRU5ErkJggg=="

    resp = make_response(
        render_template(
            "error.html", error_code=error_code, message=message, icon=error_trinket
        )
    )
    resp.headers["X-Frame-Options"] = "SAMEORIGIN"
    resp.headers["X-Content-Type-Options"] = "nosniff"
    resp.headers["Strict-Transport-Security"] = (
        "max-age=63072000; includeSubDomains; preload"
    )

    return (resp, 404)


@app.errorhandler(405)
def error_405(error):
    error_code = error.code
    message = "Próbujesz zrobić coś niedozwolonego!"
    error_trinket = "iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAYAAABplKSyAAABNklEQVR4nNWXMW7CQBBFnyMKmkg5gEMZiStQ5hbuuAUdKHScIC2db5GSgxAfIBJNOlJ9JTt4d8ChGL+Knd2VPE/7F7vizkzh3Ff/hiq35+HeDzGE7NN55Dr26DMyDhO3dvxxOABQ1zUAXdcB8LpYJOv+GglhYqIf/+1YPK3XAHxtt73zfYQwUXkGch1bZOBxvwfg83hM5l9ms2Qc7kxcmHjb7QBomqa48dl0ZrEmSikJYWLiL0mRgdNyCfymwNY1lpHSmRqnCSEDSoWtKyXXEMOE8qqUbFarZIGXEnWss+Che0cpmcI5homhG3NnwdYtfSkZpwnl3t6YdmxvzBKxTAxNib05Pdq2vajFMnErngF1bI1axvsvKt7ncwA2zntFjnhvVrmJoV9YltI3qIhtQnhGrunU4weFJmZ2RUeqmQAAAABJRU5ErkJggg=="

    resp = make_response(
        render_template(
            "error.html", error_code=error_code, message=message, icon=error_trinket
        )
    )
    resp.headers["X-Frame-Options"] = "SAMEORIGIN"
    resp.headers["X-Content-Type-Options"] = "nosniff"
    resp.headers["Strict-Transport-Security"] = (
        "max-age=63072000; includeSubDomains; preload"
    )

    return (resp, 405)


@app.errorhandler(Exception)
def error_500(error):
    error_code = error.code
    message = "Wystąpił błąd ze strony serwera. Spróbuj ponownie później."
    error_trinket = "iVBORw0KGgoAAAANSUhEUgAAADUAAAAvCAYAAABDq4KNAAAB5klEQVR4nO2ZO07DQBCG/0UpCBJCQjwUiYIiDRegQdyAguNAhahANFyFghtENHAAmpRIEQ/RUERUS/VH9tibWa/XDlr7q7xydrKZT7szsY21FlUYGpObMLfWVArQAmurXkATGF9TNHR1cwsAuL68yN3/T8Z6U9mxy5hkFQa7bYpIY760aSxJU4OqE3wzHmo0Br2pZbjM9KdfJAqmYu0FlyEtfgyzSZpa1Km6hrQMNx0/S5Km1NOvqbp0dHwCANjZ2wUAfH18AgBen58qxS9bX5KmvPeUzEisU1Iak2gGy9aXtikSakDLONEyXzfO3FqTpKng3i80o5wn45C6pofG2CRNqaefrxHCTBJm9PTsPGiBLjMH43Fu/DadLq7TNLUO5AxVNeMLMx5aj2hmNBoBAGazWW78MpksPpukqcLpJzMVy5zcW9peoQFCM+T+dwsAcFfyXd0wJetGrMpPJo8PubHLjGSZGUk3TJGf73cARXNE65olvkZ8uTvcAFDca0Cippx1iqY2t/dLxy5oUDMj64wvnJftILJ0r0vXjGi4Kr+8r6GZIcn/8x3wF7JLd3UUoeZiGyHLnnKlaYoX0hhxmatLTDOStE0R7fmerzlZ6Zsw4iJJU629nXfRxJvG3lQZvubafPf7B7y+JRQK/uuwAAAAAElFTkSuQmCC"

    resp = make_response(
        render_template(
            "error.html", error_code=error_code, message=message, icon=error_trinket
        )
    )
    resp.headers["X-Frame-Options"] = "SAMEORIGIN"
    resp.headers["X-Content-Type-Options"] = "nosniff"
    resp.headers["Strict-Transport-Security"] = (
        "max-age=63072000; includeSubDomains; preload"
    )

    return (resp, 500)
