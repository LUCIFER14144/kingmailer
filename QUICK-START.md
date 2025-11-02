# KingMailer - Quick Start Guide

## 🚀 Get Started in 5 Minutes!

### Step 1: Open Terminal in Project Directory
```bash
cd kingmailer
```

### Step 2: Install Dependencies

**Email Backend (Node.js):**
```bash
cd email-backend
npm install
cd ..
```

**Inbox Backend (Python):**
```bash
cd inbox-backend
pip install -r requirements.txt
cd ..
```

### Step 3: Configure Environment

**Email Backend (.env):**
```bash
cd email-backend
cp .env.example .env
```

Edit `.env` file:
```env
PORT=3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SESSION_SECRET=your-random-secret-key
```

**Inbox Backend (config.json):**
```bash
cd inbox-backend
```

Create `config.json`:
```json
{
  "accounts": [
    {
      "email": "your-email@gmail.com",
      "password": "your-app-password"
    }
  ]
}
```

### Step 4: Start the Application

**Windows:**
```bash
start.bat
```

**Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**Or manually:**

Terminal 1 (Email Backend):
```bash
cd email-backend
npm start
```

Terminal 2 (Inbox Backend):
```bash
cd inbox-backend
python main.py
```

### Step 5: Access the Application

- **Email Backend:** http://localhost:3000
- **Inbox Backend:** http://localhost:8000
- **Frontend Dashboard:** Open `frontend/index.html` in your browser

## 📧 Getting Gmail App Password

1. Go to Google Account: https://myaccount.google.com/
2. Security → 2-Step Verification (enable if not enabled)
3. Security → App passwords
4. Select app: Mail
5. Select device: Other (Custom name)
6. Generate password
7. Copy the 16-character password
8. Use this in your `.env` and `config.json`

## ✅ Quick Test

1. Open http://localhost:3000
2. Go to "Send Email" tab
3. Fill in the form
4. Click "Send Email"
5. Check if email was sent successfully

## 🎯 Features

- ✉️ Send single emails
- 📨 Send bulk emails
- 📬 Check inbox across multiple accounts
- 🔍 Search emails by sender/subject
- 📊 Campaign tracking
- 📈 Analytics dashboard

## 🆘 Need Help?

- Check `SETUP-GUIDE.md` for detailed instructions
- Check `README.md` for full documentation
- Open an issue on GitHub: https://github.com/LUCIFER14144/kingmailer/issues

## 🎉 You're Ready!

Start sending and managing emails with KingMailer!
