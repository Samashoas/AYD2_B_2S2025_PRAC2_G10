from flask import Blueprint, jsonify, request
from app.database import db
from app.models import Product
from sqlalchemy import text

api = Blueprint('api', __name__)

@api.route('/state', methods=['GET'])
def health_check():
    """Endpoint para verificar conexión con la base de datos"""
    try:
        # Intenta ejecutar una query simple
        db.session.execute(text('SELECT 1'))
        return jsonify({
            'status': 'healthy',
            'service': 'products-service',
            'database': 'connected'
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'service': 'products-service',
            'database': 'disconnected',
            'error': str(e)
        }), 500

@api.route('/products', methods=['GET'])
def get_products():
    """Obtener todos los productos"""
    try:
        products = Product.query.all()
        return jsonify([product.to_dict() for product in products]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Obtener un producto por ID"""
    try:
        product = Product.query.get_or_404(product_id)
        return jsonify(product.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@api.route('/products/category/<int:category_id>', methods=['GET'])
def get_products_by_category(category_id):
    """Obtener productos por categoría"""
    try:
        products = Product.query.filter_by(category_id=category_id).all()
        return jsonify([product.to_dict() for product in products]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/products', methods=['POST'])
def create_product():
    """Crear un nuevo producto"""
    try:
        data = request.get_json()
        new_product = Product(
            name=data['name'],
            description=data.get('description'),
            price=data['price'],
            category_id=data['category_id']
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@api.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    try:
        product = Product.query.filter_by(id=id, active=True).first()
        if not product:
            return jsonify({'error': 'Producto no encontrado'}), 404
        
        data = request.get_json()
        
        if 'name' in data:
            product.name = data['name']
        if 'description' in data:
            product.description = data['description']
        if 'price' in data:
            product.price = data['price']
        if 'category_id' in data:
            product.category_id = data['category_id']
        
        db.session.commit()
        
        return jsonify(product.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Borrado lógico de un producto
@api.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    try:
        product = Product.query.filter_by(id=id, active=True).first()
        if not product:
            return jsonify({'error': 'Producto no encontrado'}), 404
        
        product.active = False
        db.session.commit()
        
        return jsonify({'message': 'Producto eliminado correctamente'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500