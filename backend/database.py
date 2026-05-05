import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

if not url or not key:
    print("CRITICAL: SUPABASE_URL or SUPABASE_KEY is missing from .env file")
    # Provide dummy values to prevent total crash during dev if needed, 
    # but better to let it fail with a clear message
    raise ValueError("Missing Supabase credentials in backend/.env")

supabase: Client = create_client(url, key)

