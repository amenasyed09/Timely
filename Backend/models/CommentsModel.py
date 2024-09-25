from pydantic import BaseModel, Field
from datetime import datetime

# Comment model for MongoDB
class Comment(BaseModel):
    content: str
    topic: str # The topic on which the comment is made
    user_id: str  # The ID of the user who made the comment
    time: datetime = Field(default_factory=datetime.utcnow)  # Automatically set the time of the comment

    class Config:
        orm_mode = True
