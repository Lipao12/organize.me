from flask import jsonify, Blueprint, request

inventory_bp = Blueprint("inventory", __name__)

# Imoportação de Controllers
from src.controllers.product_finder import ProductsFinder

# Importação de Repositorios
from src.models.repositories.products_repository import ProductsRepository

# Importação o gerente de conexões
from src.models.settings.db_connection_handler import db_connection_handler

@inventory_bp.route("/products", methods=["GET"])
def find_all_products():
    conn = db_connection_handler.get_connection()
    products_repository = ProductsRepository(conn)
    controller = ProductsFinder(products_repository)

    response = controller.find_all_product(request.json)
    return jsonify(response['body']), response['status_code']
