from psycopg2.extensions import connection
from typing import Dict, List

class CustomersRepository:
    def __init__(self, conn:connection) -> None:
        self.conn = conn
    
    def find_all_customers(self, user_id: str) -> List[Dict]:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT customer_id, name, email, phone
            FROM Customers
            WHERE user_id = %s
            ORDER BY name
            ''',
            (user_id,)
        )
        customers = cursor.fetchall()
        return [
            {"customers_id": row[0], "name": row[1], "email": row[2], "phone": row[3]}
            for row in customers
        ]
    
    def create_customers(self, user_id: str, customer_id: str, name: str, phone: str, email: str = None, ) -> None:
            cursor = self.conn.cursor()
            cursor.execute(
                '''
                INSERT INTO Customers (customer_id, user_id, name, email, phone)
                VALUES (%s, %s, %s, %s, %s)
                ''',
                (customer_id, user_id, name, email, phone)
            )
            self.conn.commit()
    
    def delete_customers(self, user_id: str, customers_id: str) -> None:
            cursor = self.conn.cursor()
            cursor.execute(
                '''
                DELETE FROM Customers
                WHERE user_id = %s AND customer_id = %s
                ''',
                (user_id, customers_id)
            )
            self.conn.commit()

