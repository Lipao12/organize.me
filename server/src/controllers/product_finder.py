from typing import Dict

class ProductsFinder:
    def __init__(self, products_repository) -> None:
        self.products_repository = products_repository
        
    def find_products_paginated(self, request_data)->Dict:
        try:
            user_id = request_data.get('user_id')
            if not user_id:
                return {
                    "body": {"error": "Missing required field: 'user_id'."},
                    "status_code": 400
                }
            try:
                page = int(request_data.get('page', 1))
                page_size = int(request_data.get('page_size', 12))
            except ValueError:
                return {
                    "body": {"error": "Invalid 'page' or 'page_size'. Must be integers."},
                    "status_code": 400
                }
            if page < 1 or page_size < 1:
                return {
                    "body": {"error": "'page' and 'page_size' must be greater than 0."},
                    "status_code": 400
                }
            
            products, total = self.products_repository.find_products_paginated(user_id, page, page_size)

            if not products:
                return {
                    "body": {"products": []},
                    "status_code": 200
                }
            formatted_products = [
                {
                    "productId": product[0],  
                    "name": product[2],       
                    "price": float(product[3]),     
                    "rating": float(product[4]) if product[4] is not None else 0,     
                    "stockQuantity": product[5]  
                }
                for product in products
            ]

            return {
                "body": {"products": formatted_products, "total": total},
                "status_code": 200
            }
        except Exception as exception:
            return{
                "body":{"error":"Bad Product Paginated Request", "message":str(exception)},
            "status_code":400
            }
        
    def find_all_product(self, request_data) -> Dict:
        try:
            user_id = request_data.get('user_id')
            if not user_id:
                return {
                    "body": {"error": "Missing required field: 'user_id'."},
                    "status_code": 400
                }
            
            products = self.products_repository.find_all_products(user_id)
            if not products:
                return {
                    "body": {"products": []},
                    "status_code": 200
                }
            
            formatted_products = [
                {
                    "productId": product[0],
                    "name": product[2],
                    "price": float(product[3]),
                    "rating": float(product[4]) if product[4] is not None else 0,
                    "stockQuantity": product[5]
                }
                for product in products
            ]

            return {
                "body": {"products": formatted_products},
                "status_code": 200
            }
        except Exception as exception:
            return {
                "body": {"error": "Bad Product Request", "message": str(exception)},
                "status_code": 400
            }