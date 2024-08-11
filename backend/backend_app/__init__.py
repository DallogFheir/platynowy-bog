from flask import Flask
from pathlib import Path
from .routes import pb
app = Flask(
    __name__,
)

app.register_blueprint(pb, url_prefix="/platynowy-bog")
