from fastapi import FastAPI

# Create FastAPI instance
app = FastAPI()

# Define a basic route
@app.get("/")
async def root():
    return {"message": "Welcome to SoulSolution's Backend!"}
