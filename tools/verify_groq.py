import os
import sys
from dotenv import load_dotenv
from groq import Groq

# Load .env
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_path = os.path.join(project_root, '.env')
load_dotenv(dotenv_path)

RED = "\033[91m"
GREEN = "\033[92m"
RESET = "\033[0m"

def verify_groq():
    print(f"Testing Groq API Connection...")
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key or "your_groq_api_key" in api_key:
        print(f"{RED}[FAIL] GROQ_API_KEY not set or is placeholder.{RESET}")
        return False

    try:
        client = Groq(api_key=api_key)
        # Using a stable, active model
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile", 
            messages=[
                {"role": "system", "content": "You describe connection status."},
                {"role": "user", "content": "Say 'Connection Successful'"}
            ]
        )
        response = completion.choices[0].message.content
        print(f"Response: {response}")
        if "Successful" in response or "Connection" in response:
            print(f"{GREEN}[SUCCESS] Groq API Handshake confirmed.{RESET}")
            return True
        else:
            print(f"{RED}[WARN] Unexpected response: {response}{RESET}")
            return True
    except Exception as e:
        print(f"{RED}[FAIL] Groq API Error: {str(e)}{RESET}")
        return False

if __name__ == "__main__":
    success = verify_groq()
    if not success:
        sys.exit(1)
