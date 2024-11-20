from psycopg2.extensions import connection
from typing import Tuple, List

class ProductsRepository:
    def __init__(self, conn:connection) -> None:
        self.conn = conn
    
    def find_products_paginated(self, user_id: str, page: int = 1, page_size: int = 10) -> List[Tuple]:
        offset = (page - 1) * page_size
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT * FROM Products
            WHERE user_id = %s
            ORDER BY productId
            LIMIT %s OFFSET %s
            ''',
            (user_id, page_size, offset)
        )
        products = cursor.fetchall()
        cursor.execute(
            '''
            SELECT COUNT(*) FROM Products
            WHERE user_id = %s
            ''',
            (user_id,)
        )
        total = cursor.fetchone()[0]

        return products, total
    