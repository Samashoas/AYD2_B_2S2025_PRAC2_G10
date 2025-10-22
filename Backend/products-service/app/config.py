import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{os.getenv('DB_USER', 'root')}:"
        f"{os.getenv('DB_PASSWORD', 'password')}@"
        f"{os.getenv('DB_HOST', 'mysql')}:"
        f"{os.getenv('DB_PORT', '3306')}/"
        f"{os.getenv('DB_NAME', 'products_db')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False