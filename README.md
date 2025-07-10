# Google Sheets Email Dashboard

A simple admin dashboard for managing and sending emails, with status tracking powered by Google Sheets integration.

## Features

- Fetches user data and email status from Google Sheets
- Admin can send emails only when status is **Completed**
- Status-based controls for sending and selecting users
- Responsive, easy-to-use dashboard interface

## Prerequisites

- Node.js (v16+ recommended)
- Google Sheets API credentials
- (Optional) Yarn or npm

## Getting Started

1. **Clone the repository:**
'''
git clone https://github.com/yourusername/google-sheets-email-dashboard.git
cd google-sheets-email-dashboard
'''

2. **Install dependencies:**
'''
npm install
or
yarn install
'''

3. **Set up environment variables:**
'''
- Copy `.env.example` to `.env` and fill in your Google Sheets API keys and other config.
'''

4. **Run the development server:**
'''
npm start
or
yarn start
'''

5. **Build for production:**
'''
npm run build
or
yarn build
'''

## Project Structure
'''
- `/src` — React frontend source code
- `/backend` — Node.js backend (if present)
- `/google_sheets.py` — Google Sheets integration script
'''

## Customization
'''
- Update the Google Sheets ID and API credentials in your `.env` file.
- Modify UI components in `/src/components` as needed.
'''

---

*For questions or contributions, please open an issue or submit a pull request.*