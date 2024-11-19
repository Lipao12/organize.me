from psycopg2.extensions import connection
from typing import Dict, Tuple, List

class ProductsRepository:
    def __init__(self, conn:connection) -> None:
        self.conn = conn

    def find_products(self)->List[Tuple]:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT * FROM Products
            '''
        )
        products = cursor.fetchall()
        return products