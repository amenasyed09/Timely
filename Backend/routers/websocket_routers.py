from bson import ObjectId
from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from WebSocketManager import manager
from datetime import datetime
from models.CommentsModel import Comment
from pymongo import MongoClient
router = APIRouter()



client = MongoClient("mongodb://localhost:27017")
comments_collection = client['Project']['userComments']

async def save_comment(content: str, topic: str, user_id: str,time:datetime):
    comment = Comment(content=content, topic=topic, user_id=user_id, time=time)
    comments_collection.insert_one(comment.dict())

@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str, topic: str):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            current_time = datetime.now() 
            await save_comment(data, topic, client_id,current_time)
            await manager.broadcast(f"{client_id}: {data}")
    except WebSocketDisconnect:
        await manager.disconnect(websocket)

@router.get('/{topic}/comments')
def topic_comments(topic:str):
    comments_cursor = comments_collection.find({"topic": topic})

    comments_list = list(comments_cursor)
    for comment in comments_list:
        comment['_id'] = str(comment['_id'])
    return comments_list

@router.delete('/delete/{comment_id}')
async def delete_comment(comment_id: str):
    try:
 
        object_id = ObjectId(comment_id)
        result = comments_collection.delete_one({'_id': object_id})
        
        if result.deleted_count == 1:
            await manager.broadcast(f"DELETE:{comment_id}")
            return {"message": "Comment deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Comment not found")
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.patch('/edit/{comment_id}/{inputValue}')
async def edit_comment(comment_id: str, inputValue: str):
    try:
        object_id = ObjectId(comment_id)
        result = comments_collection.update_one({'_id': object_id}, {'$set': {'content': inputValue}})
        if result.modified_count == 1:
            await manager.broadcast(f"UPDATE:{comment_id}:{inputValue}")
            return {"message": "Comment updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Comment not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
