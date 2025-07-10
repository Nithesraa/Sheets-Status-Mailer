import os
import json
from googleapiclient.discovery import build # type: ignore
from google.oauth2.service_account import Credentials # type: ignore

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

def get_service():
    creds = Credentials.from_service_account_file(
        os.environ['GOOGLE_CREDENTIALS_FILE'], scopes=SCOPES)
    return build('sheets', 'v4', credentials=creds)



# def get_emails_from_sheet():
#     sheet_id = os.environ['GOOGLE_SHEET_ID']
#     service = get_service()
#     result = service.spreadsheets().values().get(
#         spreadsheetId=sheet_id, range="Sheet1"
#     ).execute()
#     values = result.get('values', [])
#     if not values:
#         return []
#     header = [h.lower().strip() for h in values[0]]
#     try:
#         email_col_idx = header.index('email')
#         joining_col_idx = header.index('joining_date')
#         end_col_idx = header.index('end_date')
#     except ValueError:
#         return []
#     emails = []
#     for row in values[1:]:
#         email = row[email_col_idx] if len(row) > email_col_idx else ""
#         joining = row[joining_col_idx] if len(row) > joining_col_idx else ""
#         end = row[end_col_idx] if len(row) > end_col_idx else ""
#         if email:
#             emails.append({
#                 "email": email,
#                 "joining_date": joining,
#                 "end_date": end
#             })
#     return emails
def get_emails_from_sheet():
    sheet_id = os.environ['GOOGLE_SHEET_ID']
    service = get_service()
    result = service.spreadsheets().values().get(
        spreadsheetId=sheet_id, range="Sheet1"
    ).execute()
    values = result.get('values', [])
    if not values:
        return []
    header = [h.lower().strip() for h in values[0]]
    try:
        email_col_idx = header.index('email')
        joining_col_idx = header.index('joining_date')
        end_col_idx = header.index('end_date')
        status_col_idx = header.index('status')
    except ValueError:
        return []
    emails = []
    for row in values[1:]:
        email = row[email_col_idx] if len(row) > email_col_idx else ""
        joining = row[joining_col_idx] if len(row) > joining_col_idx else ""
        end = row[end_col_idx] if len(row) > end_col_idx else ""
        status = row[status_col_idx] if len(row) > status_col_idx else ""
        if email:
            emails.append({
                "email": email,
                "joining_date": joining,
                "end_date": end,
                "status": status
            })
    return emails



def save_to_sheet(data):
    sheet_id = os.environ['GOOGLE_SHEET_ID']
    service = get_service()
    body = {
        'values': [[data['email'], data['feedback']]]
    }
    service.spreadsheets().values().append(
        spreadsheetId=sheet_id,
        range="Submissions!A2",
        valueInputOption="USER_ENTERED",
        body=body
    ).execute()