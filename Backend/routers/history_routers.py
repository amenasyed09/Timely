from bson import ObjectId
from fastapi import APIRouter, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
import folium

from config import MONGO_URL
from pymongo import MongoClient

client = MongoClient(MONGO_URL)
db = client['Project']
history_collection = db['history']
router = APIRouter()



def mongo_to_dict(mongo_doc):
    doc = dict(mongo_doc)
    doc['_id'] = str(doc['_id'])  
    return doc


def get_history_item(item_id: str):
    item = history_collection.find_one({"_id": ObjectId(item_id)})
    if item is None:
        return JSONResponse(status_code=404, content={"message": "Item not found"})
    item['_id'] = str(item['_id']) 
    return mongo_to_dict(item)

def create_map():
    item = [mongo_to_dict(doc) for doc in history_collection.find({"category": "monument"})]
    map_ = folium.Map(location=[20.5937, 78.9629], zoom_start=5)  
    for monument in item:
        popup_html = f"""
            <div style="width: 200px;">
            <a href="http://localhost:3000/fullHistoryPage/{monument['_id']}" target="_blank" rel="noopener noreferrer">
                    <h4>{monument['title']}</h4>
                    <img src="{monument['urlToImage'][0]}" alt="{monument['title']}" style="width: 100%;"/>
                </a>
            </div>
            """
        iframe = folium.IFrame(popup_html, width=200, height=200)
        popup = folium.Popup(iframe, max_width=300)
        folium.Marker(
            location=[monument['lat'], monument['long']],
            popup=popup,
            tooltip=monument['title']
        ).add_to(map_)

    return map_
async def get_history_type(type: str):
    if type == 'all':
        item = [mongo_to_dict(doc) for doc in history_collection.find({})]
    elif type == 'monument':
        item = [mongo_to_dict(doc) for doc in history_collection.find({'category': 'monument'})]
    elif type == 'art':
        item = [mongo_to_dict(doc) for doc in history_collection.find({'category': 'art'})]
    else:
        raise HTTPException(status_code=404, detail="Category not found")

    return {"items": item}



@router.get("/history/{type}")
async def get_history(type: str):
    try:
        return await get_history_type(type)
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)

@router.get('/getMap')
async def get_map():
    map_=create_map()
    map_html = map_._repr_html_()

    return HTMLResponse(content=map_html, status_code=200)

@router.get('/fullHistoryPage/{item_id}')
async def get_history_item_by_id(item_id: str):
    return get_history_item(item_id)

