from typing import Dict
import uuid
import re

class CustomersDeleter:
    def __init__(self, customers_repository) -> None:
        self.customers_repository = customers_repository
        
    def delete_customers(self, request_data) -> Dict:
        required_fields = ['user_id', 'customer_id']
        missing_fields = [field for field in required_fields if not request_data.get(field)]
        
        if missing_fields:
            return {
                "body": {"error": f"Missing required fields: {', '.join(missing_fields)}."},
                "status_code": 400
            } 
        
        try:
            user_id = request_data['user_id']
            customer_id = request_data['customer_id']
            print(customer_id, user_id)

            self.customers_repository.delete_customer(
                user_id=user_id,
                customer_id=customer_id,
            )

            return {
                "body": { "message": "Customer deleted successfully."},
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
