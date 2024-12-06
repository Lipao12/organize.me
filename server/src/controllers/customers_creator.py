from typing import Dict
import uuid
import re

class CustomersCreator:
    def __init__(self, customers_repository) -> None:
        self.customers_repository = customers_repository
        
    def create_new_customers(self, request_data) -> Dict:
        errors = self.validate_customer_data(request_data)
        if errors:
            return {"body": errors, "status_code": 400}
        required_fields = ['user_id', 'name']
        missing_fields = [field for field in required_fields if not request_data.get(field)]
        
        if missing_fields:
            return {
                "body": {"error": f"Missing required fields: {', '.join(missing_fields)}."},
                "status_code": 400
            } 
        
        try:
            customer_id = str(uuid.uuid4())
            user_id = request_data['user_id']
            name = request_data['name']
            email = request_data.get('email', None)
            phone = request_data.get('phone', None)

            self.customers_repository.create_customers(
                user_id=user_id,
                customer_id=customer_id,
                name=name,
                phone=phone,
                email=email,
            )

            return {
                "body": {"customer_id": customer_id, "message": "Customer added successfully."},
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
        
    def validate_customer_data(self, data: Dict):
        if not data.get('user_id'):
            return {"error": "Missing required field 'user_id'."}
        if not data.get('name'):
            return {"error": "Missing required field 'name'."}
        if data.get('email') and not is_valid_email(data['email']):
            return {"error": "Invalid email format."}
        if data.get('phone') and not is_valid_phone(data['phone']):
            return {"error": "Invalid phone number format."}
        return None

def is_valid_email(email: str) -> bool:
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(email_regex, email) is not None

def is_valid_phone(phone: str) -> bool:
    phone_regex = r'^\+?[1-9]\d{1,14}$' 
    return re.match(phone_regex, phone) is not None
