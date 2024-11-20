from typing import Dict

class ProductsFinder:
    def __init__(self, products_repository) -> None:
        self.products_repository = products_repository
        
    def find_all_product(self, request_data)->Dict:
        try:
            user_id = request_data.get('user_id')
            page = request_data.get('page', 1)
            page_size = request_data.get('page_size', 10)
            products = self.products_repository.find_products_paginated(user_id, page, page_size)
            if not products:
                return {
                    "body": {"message": "No products found for the specified user."},
                    "status_code": 404
                }
            formatted_products = [
                {
                    "productId": product[0],  
                    "name": product[2],       
                    "price": product[3],     
                    "rating": product[4],     
                    "stockQuantity": product[5]  
                }
                for product in products
            ]

            return {
                "body": {"products": formatted_products},
                "status_code": 200
            }
        except Exception as exception:
            return{
                "body":{"error":"Bad Product Request", "message":str(exception)},
            "status_code":400
            }