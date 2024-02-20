import subprocess
import os
import queue
import json
import shutil

# Function to perform BFS on directory structure
def bfs(directory):
    # Create a queue for BFS traversal
    q = queue.Queue()
    # Enqueue the root directory
    q.put(directory)
    
    responses = {}

    while not q.empty():
        # Dequeue a directory
        current_dir = q.get()
        current_responses = []

        # List all files and directories in the current directory
        for item in os.listdir(current_dir):
            # Get the full path of the item
            item_path = os.path.join(current_dir, item)
            # If the item is a directory, enqueue it for further traversal
            if os.path.isdir(item_path):
                q.put(item_path)
            # If the item is a file with one of the desired extensions, perform execution
            elif os.path.isfile(item_path) and item.lower().endswith(('.js', '.php', '.py', '.c', '.go')):
                response = execute_code(item_path)
                
                current_responses.append({"file_name": item, "response_text": response})

        if current_responses:
            responses[current_dir] = current_responses

    return responses

# Function to execute code snippet
def execute_code(file_path):
    with open(file_path, 'r') as file:
        code = file.read()
        
        # Here goes the code execution
     
        print(response.text)
        return response.text

# Cloning the repository
access_token = "Access token here"
owner = "vaibhavintern123"
repository = "mahindra-code"
url = f"https://{access_token}@github.com/{owner}/{repository}.git"
command = f"git clone {url}"
subprocess.run(command, shell=True)

# Perform BFS on the cloned repository directory
repo_directory = os.path.join(os.getcwd(), repository)
responses = bfs(repo_directory)
print("Responses:")
for directory, files in responses.items():
    print(f"Directory: {directory}")
    for file in files:
        print(f"  File: {file['file_name']}")
        print(f"    Response:")
        print(f"{file['response_text']}\n")

# Write responses to a JSON file
json_file_path = "report.json"
with open(json_file_path, "w") as json_file:
    json.dump(responses, json_file, indent=4)

print(f"Responses have been saved to {json_file_path}")

# Delete the cloned repository
shutil.rmtree(repo_directory)
print(f"Cloned repository {repository} has been deleted.")
