import sqlparse

def is_sql_query(query):
    try:
        sqlparse.parse(query)
        return True
    except Exception:
        return False

# Example usage:
query1 = "SELECT * FROM table_name WHERE condition;"
query2 = "This is not a SQL query."

print(is_sql_query(query1))  # Output: True
print(is_sql_query(query2))  # Output: False
