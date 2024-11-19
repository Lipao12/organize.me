from typing import Dict

class ProductsFinder:
    def __init__(self, products_repository) -> None:
        self.products_repository = products_repository
        
    def find_all_product(self)->Dict:
        try:
            pass
        except Exception as exception:
            return{
                "body":{"error":"Bad Product Request", "message":str(exception)},
            "status_code":400
            }