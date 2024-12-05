from typing import Dict
import uuid

class DashboardMetrics:
    def __init__(self, dashboard_repository) -> None:
        self.dashboard_repository = dashboard_repository

    def popular_product(self, user_id: str)-> Dict:
        if not user_id:
            return {
                "body": {"error": f"User not found."},
                "status_code": 400
            }
        try:  
            pop_products = self.dashboard_repository.get_popular_products(user_id["user_id"])
            formatted_products = [
                    {
                        "productId": product[0],
                        "name": product[1],
                        "price": float(product[2]),
                        "rating": float(product[3]),
                        "stockQuantity": product[4]
                    }
                    for product in pop_products
                ]
            return {
                    "body": {"popular_products": formatted_products},
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

    def expenses_summary(self, user_id: str) -> Dict:
        if not user_id:
            return {
                "body": {"error": f"User not found."},
                "status_code": 400
            }
        try:
            expenses_data = self.dashboard_repository.get_expenses_summary(user_id["user_id"])
            total_expenses = {
                "total_expenses": float(expenses_data["total_expenses"][0]),
                "date": expenses_data["total_expenses"][1].strftime('%Y-%m-%d')
            }
            
            expenses_by_category = [
                {
                    "category": category,
                    "total_amount": float(amount),
                    "date": date.strftime('%Y-%m-%d')
                }
                for category, amount, date in expenses_data["expenses_by_category"]
            ]

            return {
                "body": {
                    "total_expenses": total_expenses,
                    "expenses_by_category": expenses_by_category
                },
                "status_code": 200
            }

        except KeyError as e:
            # Erro caso os dados retornados não tenham as chaves esperadas
            return {
                "body": {
                    "error": "Missing key in data.",
                    "message": str(e)
                },
                "status_code": 500
            }

        except ValueError as e:
            # Erro de conversão para tipos esperados (ex.: float)
            return {
                "body": {
                    "error": "Invalid data type.",
                    "message": str(e)
                },
                "status_code": 400
            }

        except self.dashboard_repository.conn.Error as e:
            # Erros de banco de dados
            return {
                "body": {
                    "error": "Database error occurred.",
                    "message": str(e)
                },
                "status_code": 500
            }

        except Exception as e:
            # Erro genérico para outros cenários não previstos
            return {
                "body": {
                    "error": "An unexpected error occurred.",
                    "message": str(e)
                },
                "status_code": 500
            }
        
    def purchase_summary(self, user_id: str) -> Dict:
        if not user_id:
            return {
                "body": {"error": f"User not found."},
                "status_code": 400
            }
        try:
            purchase_data = self.dashboard_repository.get_purchase_summary(user_id["user_id"])
            if not purchase_data:
                return {
                    "body": {"message": "No purchase summary found for the user."},
                    "status_code": 404
                }
            
            purchase_summary = [
                            {
                                "purchase_id": purchase[0],
                                "total_purchased": float(purchase[1]),
                                "change_percentage": float(purchase[2]),
                                "date": purchase[3].strftime('%Y-%m-%d')
                            }
                for purchase in purchase_data
            ]
            return {
                "body": {"purchase_summary": purchase_summary},
                "status_code": 200
            }

        except Exception as e:
            return {
                "body": {"error": "An unexpected error occurred.", "message": str(e)},
                "status_code": 500
            }
        
    def sales_summary(self, user_id: str) -> Dict:
        if not user_id:
            return {
                "body": {"error": f"User not found."},
                "status_code": 400
            }
        try:
            sale_data = self.dashboard_repository.get_sales_summary(user_id["user_id"])
            if not sale_data:
                return {
                    "body": {"message": "No sale summary found for the user."},
                    "status_code": 404
                }
            
            sales_summary = [
                            {
                                "sale_id": sale[0],
                                "total_saled": float(sale[1]),
                                "change_percentage": float(sale[2]),
                                "date": sale[3].strftime('%Y-%m-%d')
                            }
                for sale in sale_data
            ]
            print(sales_summary)

            return {
                "body": {"sales_summary": sales_summary},
                "status_code": 200
            }

        except Exception as e:
            return {
                "body": {"error": "An unexpected error occurred.", "message": str(e)},
                "status_code": 500
            }