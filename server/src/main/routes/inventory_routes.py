from flask import Blueprint

inventory_bp = Blueprint("inventory", __name__)

@inventory_bp.route("/products/", methods=["GET"])
def find_all_products():
    pass