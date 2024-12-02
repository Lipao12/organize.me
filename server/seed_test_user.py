import json
import os
from psycopg2.extensions import connection
from src.models.settings.db_connection_handler import db_connection_handler

db_connection_handler.connect()
conn = db_connection_handler.get_connection()
print(conn)
if conn is None:
    print("Falha ao conectar ao banco de dados.")
    exit(1)

file_table_mapping = {
    #"users.json": "Users",
    "products.json": "products",
    "sales.json": "Sales",
    "purchases.json": "Purchases",
    "expenses.json": "Expenses",
    "expenseSummary.json": "ExpenseSummary",
    "expenseByCategory.json": "ExpenseByCategory",
    "salesSummary.json": "SalesSummary",
    "purchaseSummary.json": "PurchaseSummary",
}

current_dir = './init/seed_data_test_user/'


def load_json(file_path: str):
    """
    Carrega o conteúdo de um arquivo JSON.

    :param file_path: Caminho para o arquivo JSON.
    :return: Conteúdo do arquivo JSON ou None se houver erro.
    """
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except json.JSONDecodeError as e:
        print(f"Erro ao carregar o JSON no arquivo {file_path}: {e}")
    except Exception as e:
        print(f"Ocorreu um erro ao acessar o arquivo {file_path}: {e}")
    return None


def insert_data_to_db(conn: connection, data: list, table_name: str):
    """
    Insere os dados carregados no banco de dados.

    :param conn: Conexão com o banco de dados.
    :param data: Dados a serem inseridos.
    :param table_name: Nome da tabela para inserção.
    """
    try:
        with conn.cursor() as cursor:
            for record in data:
                columns = ', '.join(record.keys())
                placeholders = ', '.join(['%s'] * len(record))
                values = tuple(record.values())

                query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"
                cursor.execute(query, values)
            conn.commit()
            print(f"Dados inseridos com sucesso na tabela {table_name}.")
    except Exception as e:
        conn.rollback()
        print(f"Erro ao inserir dados na tabela {table_name}: {e}")


def main():
    conn = db_connection_handler.get_connection()
    if conn is None:
        print("Falha ao conectar ao banco de dados.")
        exit(1)
    for file_name, table_name in file_table_mapping.items():
        file_path = os.path.join(current_dir, file_name)
        if os.path.exists(file_path):
            print(f"Lendo arquivo: {file_name}")
            data = load_json(file_path)
            if data:
                insert_data_to_db(conn, data, table_name)
        else:
            print(f"Arquivo {file_path} não encontrado!")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"Ocorreu um erro no processo: {e}")
    finally:
        if conn:
            conn.close()
            print("Conexão com o banco de dados encerrada.")
