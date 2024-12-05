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

    def get_expenses_summary(self, user_id: str):
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT 
                COALESCE(SUM(amount), 0) AS total_expenses, 
                CURRENT_DATE AS date 
            FROM 
                Expenses 
            WHERE 
                user_id = %s
            GROUP BY 
                CURRENT_DATE;
            ''',
            (user_id,)
        )
        total_expenses = cursor.fetchone()

        cursor.execute(
            '''
            SELECT 
                category, 
                COALESCE(SUM(amount), 0) AS total_amount, 
                CURRENT_DATE AS date 
            FROM 
                Expenses 
            WHERE 
                user_id = %s
            GROUP BY 
                category, CURRENT_DATE;
            ''',
            (user_id,)
        )
        expenses_by_category = cursor.fetchall() 

        return {
            "total_expenses": total_expenses,
            "expenses_by_category": expenses_by_category
        }
    
    def get_purchase_summary(self, user_id: str):
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT purchaseSummaryId, totalPurchased, changePercentage, date 
            FROM PurchaseSummary 
            WHERE user_id = %s
            ORDER BY date ASC
            ''',
            (user_id,)
        )
        purchase = cursor.fetchall()
        return purchase
    
    def get_sales_summary(self, user_id: str):
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT salesSummaryId, totalValue, changePercentage, date 
            FROM SalesSummary 
            WHERE user_id = %s
            ORDER BY date ASC
            ''',
            (user_id,)
        )
        purchase = cursor.fetchall()
        return purchase