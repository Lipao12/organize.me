from typing import Dict
import uuid

class UserInformation:
    def __init__(self, users_repository) -> None:
        self.users_repository = users_repository

    def getUserInfo(self, userId)->Dict:
        try:
            if not userId.get("id"):
                raise ValueError("ID de usuário inválido ou ausente.")
            
            response = self.users_repository.find_user_by_id(userId.get("id"))

            return{
                "body":{"email": response[1], "name": response[0]},
                "status_code":201
            }
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }
        except Exception as exception:
            return {
                "body": {"error": "Internal Server Error", "message": str(exception)},
                "status_code": 500
            }