from flask import jsonify, Blueprint, request

inventory_bp = Blueprint("inventory", __name__)

# Imoportação de Controllers
from src.controllers.product_finder import ProductsFinder
from src.controllers.product_creator import ProductsCreator
from src.controllers.user_creator import UserCreator 
from src.controllers.user_login import UserLogin 

# Importação de Repositorios
from src.models.repositories.products_repository import ProductsRepository
from src.models.repositories.user_reposityory import UsersRepository 

# Importação o gerente de conexões
from src.models.settings.db_connection_handler import db_connection_handler

@inventory_bp.route("/auth/register", methods=["POST"])
def create_user():
    conn = db_connection_handler.get_connection()
    users_repository = UsersRepository(conn)
    controller = UserCreator(users_repository=users_repository)

    response = controller.create(request.json)

    return jsonify(response['body']), response['status_code']

@inventory_bp.route("/auth/login", methods=["POST"])
def get_user():
    conn = db_connection_handler.get_connection()
    users_repository = UsersRepository(conn)
    controller = UserLogin(users_repository=users_repository)

    response = controller.login(request.json)

    return jsonify(response['body']), response['status_code']

@inventory_bp.route("/products/create", methods=["POST"])
def create_product():
    conn = db_connection_handler.get_connection()
    products_repository = ProductsRepository(conn)
    controller = ProductsCreator(products_repository)

    response = controller.create_new_product(request.json)
    return jsonify(response['body']), response['status_code']

@inventory_bp.route("/products", methods=["POST"])
def find_products_paginated():
    conn = db_connection_handler.get_connection()
    products_repository = ProductsRepository(conn)
    controller = ProductsFinder(products_repository)

    response = controller.find_products_paginated(request.json)
    return jsonify(response['body']), response['status_code']

@inventory_bp.route("/products/all", methods=["POST"])
def find_all_products():
    conn = db_connection_handler.get_connection()
    products_repository = ProductsRepository(conn)
    controller = ProductsFinder(products_repository)

    response = controller.find_all_product(request.json)
    return jsonify(response['body']), response['status_code']
