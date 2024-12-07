from flask import jsonify, Blueprint, request

inventory_bp = Blueprint("inventory", __name__)

# Imoportação de Controllers
from src.controllers.product_finder import ProductsFinder
from src.controllers.product_creator import ProductsCreator
from src.controllers.user_creator import UserCreator 
from src.controllers.user_login import UserLogin
from src.controllers.user_information import UserInformation 
from src.controllers.dashboard_metrics import DashboardMetrics 
from src.controllers.customers_creator import CustomersCreator 
from src.controllers.customer_finder import CustomerFinder 
from src.controllers.customer_deleter import CustomersDeleter

# Importação de Repositorios
from src.models.repositories.products_repository import ProductsRepository
from src.models.repositories.user_reposityory import UsersRepository 
from src.models.repositories.dashboard_repository import DashboardRepository 
from src.models.repositories.customers_repository import CustomersRepository

# Importação o gerente de conexões
from src.models.settings.db_connection_handler import db_connection_handler

##
## ## AUTH
##
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

@inventory_bp.route("/users/<id>/info", methods=["GET"])
def get_user_info(id):
    conn = db_connection_handler.get_connection()
    users_repository = UsersRepository(conn)
    controller = UserInformation(users_repository=users_repository)
    response = controller.getUserInfo({"id": id})

    return jsonify(response['body']), response['status_code']

##
## ## PRODUCTS
##
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

##
## ## DASHBOARD
##
@inventory_bp.route("/metrics/products/popular", methods=["POST"])
def find_popular_products():
    conn = db_connection_handler.get_connection()
    dashboard_repository = DashboardRepository(conn)
    controller = DashboardMetrics(dashboard_repository)

    response = controller.popular_product(request.json)
    return jsonify(response['body']), response['status_code']

@inventory_bp.route("/metrics/expenses/summary", methods=["POST"])
def find_expenses_summary():
    conn = db_connection_handler.get_connection()
    dashboard_repository = DashboardRepository(conn)
    controller = DashboardMetrics(dashboard_repository)

    response = controller.expenses_summary(request.json)
    return jsonify(response['body']), response['status_code']

@inventory_bp.route("/metrics/purchase/summary", methods=["POST"])
def find_purchase_summary():
    conn = db_connection_handler.get_connection()
    dashboard_repository = DashboardRepository(conn)
    controller = DashboardMetrics(dashboard_repository)

    response = controller.purchase_summary(request.json)
    return jsonify(response['body']), response['status_code']

@inventory_bp.route("/metrics/sales/summary", methods=["POST"])
def find_sales_summary():
    conn = db_connection_handler.get_connection()
    dashboard_repository = DashboardRepository(conn)
    controller = DashboardMetrics(dashboard_repository)

    response = controller.sales_summary(request.json)
    return jsonify(response['body']), response['status_code']

##
## ## CUSTOMERS
##

@inventory_bp.route("/customers/<user_id>/<costumer_id>/info", methods=["GET"])
def get_customer_info(user_id, costumer_id):
    conn = db_connection_handler.get_connection()
    customers_repository = CustomersRepository(conn)
    controller = CustomerFinder(customers_repository)

    print(user_id, costumer_id)

    request_data = {}
    request_data['customer_id'] = costumer_id 
    request_data['user_id'] = user_id

    print("sadas: ", request_data)

    response = controller.find_one_custumer(request_data)
    return jsonify(response['body']), response['status_code']

@inventory_bp.route("/customers/all", methods=["POST"])
def find_all_customers():
    conn = db_connection_handler.get_connection()
    customers_repository = CustomersRepository(conn)
    controller = CustomerFinder(customers_repository)

    response = controller.find_all_custumer(request.json)
    return jsonify(response['body']), response['status_code']

@inventory_bp.route("/customers/create", methods=["POST"])
def create_customers():
    conn = db_connection_handler.get_connection()
    customers_repository = CustomersRepository(conn)
    controller = CustomersCreator(customers_repository)

    response = controller.create_new_customers(request.json)
    return jsonify(response['body']), response['status_code']

@inventory_bp.route("/customers/delete", methods=["DELETE"])
def delete_customers():
    conn = db_connection_handler.get_connection()
    customers_repository = CustomersRepository(conn)
    controller = CustomersDeleter(customers_repository)
    
    response = controller.delete_customers(request.json)
    return jsonify(response['body']), response['status_code']