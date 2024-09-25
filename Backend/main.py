from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import news_routers,history_routers,websocket_routers,Subscribe_routers,email_routers

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(news_routers.router)
app.include_router(history_routers.router)
app.include_router(websocket_routers.router)
app.include_router(Subscribe_routers.router)
app.include_router(email_routers.router)
