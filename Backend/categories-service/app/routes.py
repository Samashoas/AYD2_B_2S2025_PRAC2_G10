from flask import Blueprint, jsonify, request
from app.database import db
from app.models import Category
from sqlalchemy import text

api = Blueprint('api', __name__)

# Estado del servicio
@api.route('/state', methods=['GET'])
def get_state():
    try:
        db.session.execute(text('SELECT 1'))
        return jsonify({
            'status': 'healthy',
            'service': 'categories-service',
            'database': 'connected'
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'service': 'categories-service',
            'database': 'disconnected',
            'error': str(e)
        }), 500

# Obtener todas las categorías activas
@api.route('/categories', methods=['GET'])
def get_categories():
    try:
        categories = Category.query.filter_by(active=True).all()
        return jsonify([category.to_dict() for category in categories]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Obtener una categoría por ID (solo si está activa)
@api.route('/categories/<int:id>', methods=['GET'])
def get_category(id):
    try:
        category = Category.query.filter_by(id=id, active=True).first()
        if not category:
            return jsonify({'error': 'Categoría no encontrada'}), 404
        return jsonify(category.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Crear una nueva categoría
@api.route('/categories', methods=['POST'])
def create_category():
    try:
        data = request.get_json()
        
        if 'name' not in data:
            return jsonify({'error': 'El campo name es requerido'}), 400
        
        # Verificar si ya existe una categoría con ese nombre
        existing = Category.query.filter_by(name=data['name'], active=True).first()
        if existing:
            return jsonify({'error': 'Ya existe una categoría con ese nombre'}), 409
        
        new_category = Category(
            name=data['name'],
            description=data.get('description', ''),
            active=True
        )
        
        db.session.add(new_category)
        db.session.commit()
        
        return jsonify(new_category.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Actualizar una categoría existente
@api.route('/categories/<int:id>', methods=['PUT'])
def update_category(id):
    try:
        category = Category.query.filter_by(id=id, active=True).first()
        if not category:
            return jsonify({'error': 'Categoría no encontrada'}), 404
        
        data = request.get_json()
        
        if 'name' in data:
            # Verificar que no exista otra categoría con el mismo nombre
            existing = Category.query.filter(
                Category.name == data['name'],
                Category.id != id,
                Category.active == True
            ).first()
            if existing:
                return jsonify({'error': 'Ya existe una categoría con ese nombre'}), 409
            category.name = data['name']
        
        if 'description' in data:
            category.description = data['description']
        
        db.session.commit()
        
        return jsonify(category.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Borrado lógico de una categoría
@api.route('/categories/<int:id>', methods=['DELETE'])
def delete_category(id):
    try:
        category = Category.query.filter_by(id=id, active=True).first()
        if not category:
            return jsonify({'error': 'Categoría no encontrada'}), 404
        
        category.active = False
        db.session.commit()
        
        return jsonify({'message': 'Categoría eliminada correctamente'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500