import subprocess
import os
import queue
import json
from fastapi import FastAPI, HTTPException ,Request
from fastapi.middleware.cors import CORSMiddleware
import shutil
import requests

app = FastAPI()



# CORS (Cross-Origin Resource Sharing) configuration
origins = [
    "http://localhost",
    "http://localhost:5173",  # Assuming your frontend runs on this port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Function to perform BFS on directory structure
def bfs(directory):
    q = queue.Queue()
    q.put(directory)
    
    responses = {}

    while not q.empty():
        current_dir = q.get()
        current_responses = []

        for item in os.listdir(current_dir):
            item_path = os.path.join(current_dir, item)
            if os.path.isdir(item_path):
                q.put(item_path)
            elif os.path.isfile(item_path) and item.lower().endswith(('.js', '.php', '.py', '.c', '.go','.css')):
                response = execute_code(item_path)
                current_responses.append({"file_name": item, "response_text": response})

        if current_responses:
            responses[current_dir] = current_responses

    return responses

# Function to execute code snippet
def execute_code(file_path):
    with open(file_path, 'r') as file:
        code = file.read()
        
        # Code execution
        try:
            import vertexai
            from vertexai.language_models import CodeChatModel



            vertexai.init(project="presales-286307", location="us-central1")
            chat_model = CodeChatModel.from_pretrained("codechat-bison")



            chat = chat_model.start_chat()
            response = chat.send_message(f"""
{code}\
classify the different CVE in this code snippet
FORMAT:
CWE-id:Code Snippet

[Insert code snippet here]

Instructions for Use:

Include the code snippet you want to analyze within triple backticks (```) for proper formatting.
Ask GCP Bison to analyze the code snippet for vulnerabilities.
Upon receiving the analysis, look for the detected vulnerabilities listed in the specified format.
"""


, temperature=0.01)

            return response.text
        except Exception as e:
            return f"Error processing code snippet: {str(e)}"

@app.get("/")
async def process_repository(access_token: str, owner: str, repository: str ,request:Request):
    guard_ai_url = "http://localhost:5000/GuardAI"  # Update with your actual endpoint URL
    header =request.client.host
    payload =[access_token, owner, repository]
    response = requests.post(guard_ai_url, params={'request':str(header)},json=payload)
    print(response)
    
    try:
        # Cloning the repository
        url = f"https://{access_token}@github.com/{owner}/{repository}.git"
        command = f"git clone {url}"
        subprocess.run(command, shell=True, check=True)

        # Perform BFS on the cloned repository directory
        repo_directory = os.path.join(os.getcwd(), repository)
        responses = bfs(repo_directory)

        # Save responses to a JSON file
        with open('responses.json', 'w') as f:
            json.dump(responses, f)

        # Delete the cloned repository
        shutil.rmtree(repo_directory)

        # Return the responses
        return responses
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"Git clone failed: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
