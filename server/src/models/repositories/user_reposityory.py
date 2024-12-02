from psycopg2.extensions import connection
from typing import Dict, Tuple, Optional
import bcrypt
import os
from dotenv import load_dotenv

load_dotenv()

class UsersRepository:
    def __init__(self, conn: connection) -> None:
        self.conn = conn

    def create_user(self, users_info: Dict[str, str]) -> None:
        bcrypt_cost = int(os.getenv("BCRYPT_COST", os.getenv('BCRYPT_COST'))) 
        salt = bcrypt.gensalt(rounds=bcrypt_cost)
        hashed_password = bcrypt.hashpw(users_info["password"].encode('utf-8'), salt)
        
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            INSERT INTO Users
                (id, name, email, password)
            VALUES
                (%s, %s, %s, %s)
            ''',
            (
                users_info["id"],
                users_info["name"],
                users_info["email"],
                hashed_password.decode('utf-8'),
            )
        )
        self.conn.commit()

    def find_user_by_id(self, user_id: str) -> Optional[Tuple]:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT name, email FROM Users WHERE id = %s
            ''', 
            (user_id,)
        )
        user = cursor.fetchone()
        return user

    def login(self, email: str, password: str) -> Optional[str]:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT id, password, name FROM Users WHERE email = %s
            ''', 
            (email,)
        )
        user = cursor.fetchone()
        if user and bcrypt.checkpw(password.encode('utf-8'), user[1].encode('utf-8')):
            return [user[0], user[2]]
        return None
