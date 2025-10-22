from flask import Flask
from flask_cors import CORS
from app.config import Config
from app.database import db, init_db
from app.routes import api

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Habilitar CORS
    CORS(app , resources={
        r"/api/*": {
            "origins": "*",
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    # Inicializar base de datos
    init_db(app)
    
    # Registrar blueprints
    app.register_blueprint(api, url_prefix='/api')
    
    return app