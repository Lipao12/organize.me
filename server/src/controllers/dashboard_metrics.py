from typing import Dict
import uuid

class DashboardMetrics:
    def __init__(self, dashboard_repository) -> None:
        self.dashboard_repository = dashboard_repository

    def popular_product(self, user_id: str)-> Dict:
        print(user_id)
        if not user_id:
            return {
                "body": {"error": f"User not found."},
                "status_code": 400
            }
        
        pop_products = self.dashboard_repository.get_popular_products(user_id["user_id"])
        formatted_products = [
                {
                    "productId": product[0],
                    "name": product[1],
                    "price": float(product[2]),
                    "rating": float(product[3]),
                    "stockQuantity": product[4]
                }
                for product in pop_products
            ]
        print("Propular: ", formatted_products)
        return {
                "body": {"popular_products": formatted_products},
                "status_code": 201
            }

        
    def create_new_product(self, request_data) -> Dict:
        required_fields = ['user_id', 'name', 'price', 'stock_quantity']
        missing_fields = [field for field in required_fields if not request_data.get(field)]
        
        if missing_fields:
            return {
                "body": {"error": f"Missing required fields: {', '.join(missing_fields)}."},
                "status_code": 400
            }
        
        try:
            product_id = str(uuid.uuid4())
            user_id = request_data['user_id']
            name = request_data['name']
            price = float(request_data['price'])
            stock_quantity = int(request_data['stock_quantity'])
            rating = request_data.get('rating')

            self.products_repository.create_product(
                user_id=user_id,
                product_id=product_id,
                name=name,
                price=price,
                stock_quantity=stock_quantity,
                rating=rating
            )

            return {
                "body": {"product_id": product_id, "message": "Product created successfully."},
                "status_code": 201
            }
        except ValueError as e:
            return {
                "body": {"error": "Invalid data type provided.", "message": str(e)},
                "status_code": 400
            }
        except Exception as e:
            return {
                "body": {"error": "An unexpected error occurred.", "message": str(e)},
                "status_code": 500
            }