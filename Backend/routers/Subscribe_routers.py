from bson import ObjectId
from fastapi import APIRouter, HTTPException
from models.UserModel import User
from pymongo import MongoClient
from pydantic import BaseModel

router=APIRouter()

client = MongoClient("mongodb://localhost:27017")
user_collection = client['Project']['users']


class UnsubscribeRequest(BaseModel):
    username: str

@router.post("/subscribe")
async def subscribe(user: User):
    user_doc = user.dict()
 
    existing_user = user_collection.find_one({
        "$or": [
            {"email": user.email},
            {"username": user.username}
        ]
    })
    
    if existing_user:

        if existing_user.get("email") == user.email:
            detail = "Email already subscribed"
        elif existing_user.get("username") == user.username:
            detail = "Username already taken"
        else:
            detail = "Email or username already subscribed"
        
        raise HTTPException(status_code=400, detail=detail)

    result = user_collection.insert_one(user_doc)
    
    if result.acknowledged:
        return {"message": "Subscription successful"}
    else:
        raise HTTPException(status_code=500, detail="An error occurred while subscribing")


@router.post("/unsubscribe")
async def unsubscribe(request: UnsubscribeRequest):
    user = user_collection.find_one({"username": request.username})
    if user:
        user_collection.delete_one({"_id": user['_id']})
        return {"message": "User unsubscribed successfully"}
    else:
        return {"error": "User not found"}, 404