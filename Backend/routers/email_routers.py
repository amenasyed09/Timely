import random
import smtplib
from email.mime.text import MIMEText
from fastapi import APIRouter, HTTPException
from pymongo import MongoClient
from config import MONGO_URL,SENDER_EMAIL,PASSWORD

client = MongoClient(MONGO_URL)
db = client['Project']
history_collection = db['history']
user_collection = db['users']

router = APIRouter()



@router.get("/sendemail/{user}")
async def send_email(user: str):
    try:
        user_data = user_collection.find_one({"username": user})
        if not user_data:
            raise HTTPException(status_code=404, detail="User not found.")
        
        receiver_email = user_data.get('email')
        if not receiver_email:
            raise HTTPException(status_code=404, detail="Email address not found for the user.")
        
        doc=history_collection.find({})[0]
        subject = "Thank You for Subscribing"
        body = f"""
        <html>
        <body>
            <p>Hello,</p>
            <p>Thank you for subscribing to our service. We're excited to keep you updated!</p>
            <p>Here's a history fact for you:</p>
            <h2>{doc.get('title', 'No title available')}</h2>
            <p>{doc.get('summary', 'No summary available')}</p>
            {''.join([f'<img src="{img}" alt="History Image" style="width: 200px; height: auto;"/>' for img in doc.get('urlToImage', [])])}
        </body>
        </html>
        """
        
        msg = MIMEText(body, 'html')
        msg['Subject'] = subject
        msg['From'] = SENDER_EMAIL
        msg['To'] = receiver_email
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(SENDER_EMAIL, PASSWORD)
        server.sendmail(SENDER_EMAIL, receiver_email, msg.as_string())
        server.quit()

        return {"message": "Email sent successfully with the first history fact."}
    
    except smtplib.SMTPException as e:

        raise HTTPException(status_code=500, detail=f"SMTP error occurred: {e}")
    
    except Exception as e:
   
        raise HTTPException(status_code=500, detail=f"Failed to send email: {e}")
