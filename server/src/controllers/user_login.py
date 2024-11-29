from typing import Dict


class UserLogin:
    def __init__(self, users_repository, ) -> None:
        self.users_repository = users_repository
    
    def login(self, body)->Dict:
        email = body.get("email")
        password = body.get("password")

        user_id, name = self.users_repository.login(email, password)

        if not user_id:
            return {
                "body": {"error": "No match.", "message": "Invalid credentials."},
                "status_code": 401
            }
        try:
            return{
                "body":{
                    "id":user_id,
                    "name": name
                },
                "status_code": 200
            }
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }
    