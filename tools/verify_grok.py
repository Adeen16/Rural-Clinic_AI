import os
import sys
from dotenv import load_dotenv
from openai import OpenAI

# Load .env from project root
# Assuming this script is in tools/ and .env is in ../
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_path = os.path.join(project_root, '.env')
load_dotenv(dotenv_path)

RED = "\033[91m"
GREEN = "\033[92m"
RESET = "\033[0m"

def verify_grok():
    print(f"Testing Grok API Connection...")
    api_key = os.getenv("GROK_API_KEY")
    if not api_key or "your_grok_api_key" in api_key:
        print(f"{RED}[FAIL] GROK_API_KEY not set or is generic placeholder.{RESET}")
        return False

    client = OpenAI(
        api_key=api_key,
        base_url="https://api.x.ai/v1",
    )

    try:
        completion = client.chat.completions.create(
            model="grok-beta", # Or current stable model name
            messages=[
                {"role": "system", "content": "You are a connection tester."},
                {"role": "user", "content": "Reply with 'Connection Successful' only."}
            ]
        )
        response = completion.choices[0].message.content
        print(f"Response: {response}")
        if "Successful" in response or "Connection" in response:
            print(f"{GREEN}[SUCCESS] Grok API Handshake confirmed.{RESET}")
            return True
        else:
            print(f"{RED}[WARN] Unexpected response: {response}{RESET}")
            return True # Still strictly a connection success
    except Exception as e:
        print(f"{RED}[FAIL] Grok API Error: {str(e)}{RESET}")
        return False

if __name__ == "__main__":
    success = verify_grok()
    if not success:
        sys.exit(1)
