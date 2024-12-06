from typing import Dict

class CustomerFinder:
    def __init__(self, customers_repository) -> None:
        self.customers_repository = customers_repository
        
    def find_all_product(self, request_data) -> Dict:
        try:
            user_id = request_data.get('user_id')
            if not user_id:
                return {
                    "body": {"error": "Missing required field: 'user_id'."},
                    "status_code": 400
                }
            
            customers = self.customers_repository.find_all_customers(user_id)
            if not customers:
                return {
                    "body": {"customers": []},
                    "status_code": 200
                }
            print(customers)
            

            return {
                "body": {"customers": customers},
                "status_code": 200
            }
        except Exception as exception:
            return {
                "body": {"error": "Bad Product Request", "message": str(exception)},
                "status_code": 400
            }