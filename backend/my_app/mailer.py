from django.core.mail import send_mail
from django.conf import settings
import os


def send_email_with_token(email, token):
    
    domain = os.environ.get('DOMAIN', 'http://localhost:5173')
    link = f"{domain}/form/?email={email}&token={token}"
    subject = "Submit Your Feedback"
    message = f"Click the link to share your experience with VDart: {link}"
    send_mail(subject, message, settings.EMAIL_HOST_USER, [email])