import traceback
from fastapi import APIRouter, HTTPException, Query
import httpx
from pydantic import BaseModel
from newspaper import Article

router = APIRouter()
class ArticleRequest(BaseModel):
    url: str


@router.get("/")
async def get_news():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get('https://gnews.io/api/v4/top-headlines?country=in&category=general&apikey=56ccb1e25242e4191fe03acb6e1b310a')
            response.raise_for_status() 
            articles = response.json().get('articles', [])

        return {"news": articles}

    except httpx.HTTPStatusError as http_error:
        raise HTTPException(status_code=http_error.response.status_code, detail=str(http_error))
    except Exception as error:
        raise HTTPException(status_code=500, detail="An error occurred while fetching the news.")


@router.get('/news/{category}')
async def news(category:str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get('https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=in&apikey=56ccb1e25242e4191fe03acb6e1b310a')
            response.raise_for_status() 
            articles = response.json().get('articles', [])

        return {"news": articles}

    except httpx.HTTPStatusError as http_error:
        raise HTTPException(status_code=http_error.response.status_code, detail=str(http_error))
    except Exception as error:
        raise HTTPException(status_code=500, detail="An error occurred while fetching the news.")


@router.get("/summarize/")
async def summarize_article(url: str):
    try:
        article = Article(url)
        article.download()
        article.parse()
        article.nlp()
        return {"summary": article.summary}
    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail="Error processing the article.")