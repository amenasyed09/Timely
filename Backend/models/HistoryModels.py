from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl
from pymongo import MongoClient
from typing import List
import wikipedia
import wikipediaapi

app = FastAPI()



client = MongoClient("mongodb://localhost:27017")
db = client['Project']
history_collection = db['history']
wiki_wiki = wikipediaapi.Wikipedia('History', 'en')
x = wikipedia.WikipediaPage(title='Madhubani Art')
url_to_image = x.images
page_py = wiki_wiki.page('Madhubani Art')
description = page_py.text
url = page_py.fullurl
summary = page_py.summary

history_data = {
    "title": "Madhubani Art",
    "url": url,
    "urlToImage": url_to_image,
    "description": description,
    "summary": summary,
    "category":"art",
   
}

@app.get("/")
async def create_history_item():
    print('here')
    try:

        result = history_collection.insert_one(history_data)
        return {"inserted_id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to insert data: {e}")


