import psycopg2
from psycopg2 import OperationalError
from dotenv import load_dotenv
import os

load_dotenv()

class DbConnectionHandler:
    def __init__(self)->None:
        self.user = os.getenv('USER')
        self.password = os.getenv('PASSWORD')
        self.host = os.getenv('HOST')
        self.port = os.getenv('PORT')
        self.database = os.getenv('DATABASE')
        self.__conn = None
    
    def connect(self)->None:
        try:
            self.connection = psycopg2.connect(
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port,
                database=self.database
            )
            print("Conexão com o PostgreSQL foi estabelecida com sucesso.")
        except OperationalError as e:
            print(f"Erro ao conectar ao PostgreSQL: {e}")
    def get_connection(self):
        return self.connection
    '''def connectt(self) -> None:
        conn = psycopg2.connect(self.__connection_string)
        self.__conn = conn

    def get_connection(self) -> connection:
        return self.__conn'''

db_connection_handler = DbConnectionHandler()