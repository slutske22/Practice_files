# %%
import sqlite3

print('connect')
db = sqlite3.connect('db-api.db')
cur = db.cursor()

print('create')
cur.execute("DROP TABLE IF EXISTS test")
cur.execute("""
  CREATE TABLE TEST (
    ID INTEGER PRIMARY KEY, string TEXT, number INTEGER
  )
""")

print('insert row')
cur.execute("""
  INSERT INTO test (string, number) VALUES ('one', 1)
""")

print('insert row')
cur.execute("""
  INSERT INTO test (string, number) VALUES ('two', 2)
""")

print('insert row')
cur.execute("""
  INSERT INTO test (string, number) VALUES ('three', 3)
""")

print('commit')
db.commit()

print('count')
cur.execute("SELECT COUNT(*) FROM test")
count = cur.fetchone()[0]
print(f"There are {count} rows in the database")

print('read')
for row in cur.execute("SELECT * FROM test"):
    print(row)

print('drop')
cur.execute("DROP TABLE test")

print('close')
db.close()
# %%


def some_function():
    """
      this is a comment
    """
    print('something')
