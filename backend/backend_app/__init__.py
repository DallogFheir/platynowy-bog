from flask import Flask
from pathlib import Path

app = Flask(
    __name__,
    static_folder=Path(__file__).parent / "build" / "static",
    static_url_path="/",
    template_folder=Path(__file__).parent.parent / "templates",
)

from .routes import app
