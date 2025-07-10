from rest_framework.decorators import api_view # type: ignore
from rest_framework.response import Response # type: ignore
from .google_sheets import get_emails_from_sheet, save_to_sheet
from .mailer import send_email_with_token
from .mongodb import feedback_collection  # Use MongoDB directly
from .tokens import generate_token


# @api_view(['GET'])
# def fetch_emails(request):
#     """
#     Get all emails from Google Sheets and check their submission status
#     """
#     emails = get_emails_from_sheet()
#     data = []
#     for email in emails:
#         submission = feedback_collection.find_one({"email": email})
#         status = "Submitted" if submission else "Not Submitted"
#         data.append({"email": email, "status": status})
#     return Response(data)

@api_view(['GET'])
def fetch_emails(request):
    emails_data = get_emails_from_sheet()
    data = []
    for item in emails_data:
        email = item["email"]
        joining_date = item.get("joining_date", "")
        end_date = item.get("end_date", "")
        submission = feedback_collection.find_one({"email": email})
        status = "Submitted" if submission else "Not Submitted"
        data.append({
            "email": email,
            "status": status,
            "joining_date": joining_date,
            "end_date": end_date
        })
    return Response(data)



@api_view(['POST'])
def send_mail(request, email):
    token = generate_token()
    send_email_with_token(email, token)
    return Response({"message": f"Mail sent to {email}."})





@api_view(['POST'])
def submit_form(request, email, token):
    """
    Save form submission to MongoDB
    """
    data = request.data
    feedback_collection.insert_one({
        "email": email,
        "token": token,
        "feedback": data['feedback']
    })
    save_to_sheet({
        "email": email,
        "token": token,
        "feedback": data['feedback']
    })
    return Response({"message": "Form submitted successfully."})
