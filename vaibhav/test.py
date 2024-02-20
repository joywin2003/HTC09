from fastapi import FastAPI, Request
import json
from datetime import datetime
import redis.asyncio as redis
import re
from fastapi import Depends, FastAPI
from fastapi import HTTPException

from fastapi_limiter import FastAPILimiter
from fastapi_limiter.depends import RateLimiter

app = FastAPI()
blacklist_file = "blacklist.json"
def is_sql_query(input):
    # Regular expression pattern to match common SQL keywords and patterns (case-insensitive)
    sql_pattern = re.compile(r'(SELECT|INSERT|UPDATE|DELETE|FROM|INTO|VALUES|WHERE|AND|OR|ORDER BY|GROUP BY|HAVING|LIMIT)', re.IGNORECASE)

    # Check if the input contains SQL keywords or characters commonly used in SQL queries
    return bool(sql_pattern.search(input))

    

redis_connection = redis.from_url("redis://localhost", encoding="utf-8", decode_responses=True)

    



def add_to_blacklist(ip):
    try:
        with open(blacklist_file, "r") as file:
            blacklist = json.load(file)
    except FileNotFoundError:
        blacklist = []
        
    if ip not in blacklist:
        blacklist.append(ip)
        
    with open(blacklist_file, "w") as file:
        json.dump(blacklist, file)


# Define the path to the JSON file
json_file = "request_counts.json"

# Load existing request counts from the JSON file
try:
    with open(json_file, "r") as file:
        request_data = json.load(file)
except FileNotFoundError:
    request_data = {}
 
def calculate_rate(client_ip):
    # Get the request count and last datetime for the client IP from request_data
    if client_ip in request_data:
        request_count = request_data[client_ip]["count"]
        last_datetime = datetime.fromisoformat(request_data[client_ip]["last_datetime"])
    else:
        request_count = 0
        last_datetime = datetime.now()

    # Calculate the rate of requests per second
    current_datetime = datetime.now()
    time_difference = (current_datetime - last_datetime).total_seconds()
    rate = request_count / time_difference if time_difference > 0 else 0

    return rate

async def get_rate_limit(request: Request):
    # Your logic to determine the rate limit dynamically
    client_ip = request.client.host
    print(client_ip)
    print(request_data)
    with open("blacklist.json", "r") as blacklist_file:
        blacklist = json.load(blacklist_file)
    if str(client_ip) in blacklist:
        times = 1
        seconds = 10
    else:
        times = 12
        seconds = 10

    # Calculate the rate for the IP address
    rate = calculate_rate(client_ip)

    # Check if rate limit exceeded
    if rate > times:
        raise HTTPException(status_code=429, detail="Rate limit exceeded")

    return {"times": times, "seconds": seconds}


@app.on_event("startup")
async def startup():
    await FastAPILimiter.init(redis_connection)
@app.post("/GuardAI", dependencies=[Depends(get_rate_limit)])
async def read_root(request: Request, strings: list[str]):  
    client_ip = request.client.host

    # Get the current datetime
    current_datetime = datetime.now().isoformat()
    print(request_data)
    
    # Update the request count and datetime for the current IP address
    if client_ip in request_data:
        request_data[client_ip]["count"] += 1
        request_data[client_ip]["last_datetime"] = current_datetime
    else:
        request_data[client_ip] = {
            "count": 1,
            "last_datetime": current_datetime
        }
    
    print(f"Client IP: {client_ip}, Request Count: {request_data[client_ip]['count']}")
    
    # Save the updated request data to the JSON file
    with open(json_file, "w") as file:
        json.dump(request_data, file)

    # Add client IP to response_counts.json if it doesn't exist
    if client_ip not in request_data:
        request_data[client_ip] = {
            "count": 0,
            "last_datetime": None
        }
        with open('request_counts.json', "w") as file:
            json.dump(request_data, file)
    
    return {
        "Client IP": client_ip,
        "Request Count": request_data[client_ip]["count"],
        "Last Request Datetime": request_data[client_ip]["last_datetime"]
    }

