from typing import Dict

class CustomerFinder:
    def __init__(self, customers_repository) -> None:
        self.customers_repository = customers_repository
        
    def find_one_custumer(self, request_data) -> Dict:
        try:
            user_id = request_data.get('user_id')
            customer_id = request_data.get('customer_id')
            if not user_id:
                return {
                    "body": {"error": "Missing required field: 'user_id'."},
                    "status_code": 400
                }
            if not customer_id:
                return {
                    "body": {"error": "Missing required field: 'customer_id'."},
                    "status_code": 400
                }
            
            customer_info = self.customers_repository.find_one_customer(user_id, customer_id)
            if not customer_info:
                return {
                    "body": {"customer_info": []},
                    "status_code": 200
                }
            print(customer_info)
            

            return {
                "body": {"customer_info": customer_info},
                "status_code": 200
            }
        except Exception as exception:
            return {
                "body": {"error": "Bad Product Request", "message": str(exception)},
                "status_code": 400
            }
        
    def find_all_custumer(self, request_data) -> Dict:
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