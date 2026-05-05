import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

print(f"Connecting to {url}...")
try:
    supabase = create_client(url, key)
    res = supabase.table("templates").select("id").limit(1).execute()
    print("Connection Successful:", res.data)
except Exception as e:
    print("Connection Failed:", str(e))
