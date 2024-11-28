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
    
    def find_all_products(self, user_id: str) -> List[Tuple]:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT * FROM Products
            WHERE user_id = %s
            ORDER BY productId
            ''',
            (user_id,)
        )
        products = cursor.fetchall()
        return products
    
    def create_product(self, user_id: str, product_id: str, name: str, price: float, stock_quantity: int, rating: float = None) -> None:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            INSERT INTO Products (productId, user_id, name, price, stockQuantity, rating)
            VALUES (%s, %s, %s, %s, %s, %s)
            ''',
            (product_id, user_id, name, price, stock_quantity, rating)
        )
        self.conn.commit()
