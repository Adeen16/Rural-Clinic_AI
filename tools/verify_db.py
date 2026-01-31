import os
import sys
import psycopg2
import redis
from dotenv import load_dotenv
from urllib.parse import urlparse

# Load .env
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_path = os.path.join(project_root, '.env')
load_dotenv(dotenv_path)

RED = "\033[91m"
GREEN = "\033[92m"
RESET = "\033[0m"

def verify_postgres():
    print("Testing PostgreSQL Connection...")
    db_url = os.getenv("DATABASE_URL")
    if not db_url or "user:password" in db_url:
        print(f"{RED}[FAIL] DATABASE_URL not set or is placeholder.{RESET}")
        return False
    
    try:
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        cur.execute("SELECT 1;")
        cur.fetchone()
        cur.close()
        conn.close()
        print(f"{GREEN}[SUCCESS] PostgreSQL Handshake confirmed.{RESET}")
        return True
    except Exception as e:
        print(f"{RED}[FAIL] Postgres Error: {str(e)}{RESET}")
        return False

def verify_redis():
    print("Testing Redis Connection...")
    redis_url = os.getenv("REDIS_URL")
    if not redis_url:
        print(f"{RED}[SKIP] REDIS_URL not set.{RESET}")
        return True # Soft pass if not critical yet, but usually fail if in stack
    
    try:
        r = redis.from_url(redis_url)
        r.ping()
        print(f"{GREEN}[SUCCESS] Redis Handshake confirmed.{RESET}")
        return True
    except Exception as e:
        print(f"{RED}[FAIL] Redis Error: {str(e)}{RESET}")
        return False

if __name__ == "__main__":
    pg_ok = verify_postgres()
    # redis_ok = verify_redis() # Uncomment if redis is strictly required now
    
    if not pg_ok: # Add redis_ok check if needed
        sys.exit(1)
