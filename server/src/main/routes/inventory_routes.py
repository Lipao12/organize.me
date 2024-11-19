from flask import Blueprint

inventory_bp = Blueprint("inventory", __name__)

@inventory_bp.route("/product/<productId>", methods=["GET"])
def find_trip(productId):
    pass