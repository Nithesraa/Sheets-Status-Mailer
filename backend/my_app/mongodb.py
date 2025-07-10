# myapp/mongodb.py
from .mongo import feedback_collection

def save_submission_to_mongo(email, token, feedback):
    submission = {
        "email": email,
        "token": token,
        # "name": name,
        # "phone": phone,
        # "department": department
        "feedback":feedback
    }
    feedback_collection.insert_one(submission)