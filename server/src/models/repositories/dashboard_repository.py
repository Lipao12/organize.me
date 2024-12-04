from psycopg2.extensions import connection
from typing import Dict, Tuple, Optional
import os
from dotenv import load_dotenv

load_dotenv()

class DashboardRepository:
    def __init__(self, conn: connection) -> None:
        self.conn = conn

    def get_popular_products(self, user_id: str):
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT productId, name, price, rating, stockQuantity 
            FROM Products
            WHERE user_id = %s AND stockQuantity > 0 AND rating IS NOT NULL
            ORDER BY rating DESC, created_at DESC
            LIMIT 6
            ''',
            (user_id,)
        )
        products = cursor.fetchall()
        return products

    
