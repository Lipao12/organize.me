from typing import Dict
import uuid

class UserCreator:
    def __init__(self, users_repository) -> None:
        self.users_repository = users_repository

    def create(self, body)->Dict:
        try:
            if not isinstance(body, dict):
                raise ValueError("Body must be a dictionary.")
            
            user_id = str(uuid.uuid4())
            user_info = {**body, "id":user_id}
            self.users_repository.create_user(user_info)

            return{
                "body":{"id": user_id, "name": body["name"]},
                "status_code":201
            }
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }