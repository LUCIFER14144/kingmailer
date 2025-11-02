# KingMailer Setup Guide

This guide will help you set up and run KingMailer on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **Git** - [Download](https://git-scm.com/)
- **npm** (comes with Node.js)
- **pip** (comes with Python)

## Quick Start

### Step 1: Navigate to the Project

```bash
cd kingmailer
```

### Step 2: Setup Email Backend (Node.js)

1. Navigate to email backend:
```bash
cd email-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
# Copy the example file
cp .env.example .env
```

4. Edit `.env` file with your SMTP credentials:
```env
PORT=3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SESSION_SECRET=your-random-secret-key
```

**Getting Gmail App Password:**
- Go to Google Account settings
- Security → 2-Step Verification → App passwords
- Generate a new app password
- Use this password in SMTP_PASS

5. Start the email backend:
```bash
npm start
```

The email backend will run on http://localhost:3000

### Step 3: Setup Inbox Backend (Python)

1. Open a new terminal and navigate to inbox backend:
```bash
cd kingmailer/inbox-backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Create configuration file:
```bash
# Create config.json
```

4. Edit `config.json` with your email accounts:
```json
{
  "accounts": [
    {
      "email": "your-email1@gmail.com",
      "password": "your-app-password"
    },
    {
      "email": "your-email2@yahoo.com",
      "password": "your-app-password"
    }
  ]
}
```

**Note:** Use app-specific passwords, not your regular email password!

5. Start the inbox backend:
```bash
python main.py
```

The inbox backend will run on http://localhost:8000

## Accessing the Application

### Email Marketing Features
Open your browser and go to:
- **Main Interface:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin.html
- **Login:** http://localhost:3000/login.html

### Inbox Checker Features
Open your browser and go to:
- **Inbox Checker:** http://localhost:8000

## Default Credentials

For the email backend admin panel:
- **Username:** admin
- **Password:** admin123

⚠️ **Important:** Change these credentials in production!

## Testing the Setup

### Test Email Sending

1. Go to http://localhost:3000
2. Fill in the email form:
   - From: your-email@gmail.com
   - To: recipient@example.com
   - Subject: Test Email
   - Message: This is a test
3. Click "Send Email"

### Test Inbox Checking

1. Go to http://localhost:8000
2. Enter search criteria:
   - Sender Email: someone@example.com
   - OR Subject: Test Subject
3. Click "Search"
4. Wait for results

## Common Issues and Solutions

### Issue 1: "SMTP Authentication Failed"

**Solution:**
- Ensure you're using an app-specific password
- Enable "Less secure app access" (for Gmail)
- Check SMTP credentials in `.env`

### Issue 2: "Port already in use"

**Solution:**
```bash
# For Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# For Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Issue 3: "Module not found" (Python)

**Solution:**
```bash
pip install -r requirements.txt --upgrade
```

### Issue 4: "Cannot connect to IMAP server"

**Solution:**
- Check email credentials in `config.json`
- Ensure IMAP is enabled in email settings
- Use app-specific passwords

## Development Mode

### Email Backend (with auto-reload)
```bash
cd email-backend
npm run dev
```

### Inbox Backend (with auto-reload)
```bash
cd inbox-backend
uvicorn main:app --reload --port 8000
```

## Production Deployment

### Using Docker Compose

1. Build and start all services:
```bash
docker-compose up -d
```

2. Stop all services:
```bash
docker-compose down
```

### Manual Deployment

See `DEPLOYMENT.md` in each backend folder for detailed deployment instructions.

## Environment Variables Reference

### Email Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| SMTP_HOST | SMTP server | smtp.gmail.com |
| SMTP_PORT | SMTP port | 587 |
| SMTP_USER | Email address | user@gmail.com |
| SMTP_PASS | App password | xxxx xxxx xxxx xxxx |
| SESSION_SECRET | Secret key | random-string-here |

### Inbox Backend (config.json)

```json
{
  "accounts": [
    {
      "email": "account@provider.com",
      "password": "app-specific-password"
    }
  ]
}
```

## Security Best Practices

1. **Never commit sensitive files:**
   - `.env`
   - `config.json`
   - Any files with passwords

2. **Use app-specific passwords:**
   - Never use your main email password
   - Generate app passwords from email provider

3. **Enable 2FA:**
   - Enable two-factor authentication on all email accounts

4. **Rotate credentials:**
   - Change passwords regularly
   - Revoke unused app passwords

5. **Use HTTPS in production:**
   - Always use SSL/TLS certificates
   - Never send credentials over HTTP

## Getting Help

If you encounter issues:

1. Check the logs in the terminal
2. Review this setup guide
3. Check the main README.md
4. Open an issue on GitHub

## Next Steps

After successful setup:

1. Customize the frontend
2. Add your branding
3. Configure email templates
4. Set up monitoring
5. Deploy to production

## Useful Commands

```bash
# Install all dependencies
npm run install:all

# Start email backend
npm run start:email

# Start inbox backend
npm run start:inbox

# Development mode (email)
npm run dev:email

# Development mode (inbox)
npm run dev:inbox

# Check Node.js version
node --version

# Check Python version
python --version

# Check npm version
npm --version

# Check pip version
pip --version
```

## Support

For additional help:
- GitHub Issues: https://github.com/LUCIFER14144/kingmailer/issues
- Email: kevinstark329@gmail.com

---

**Happy Mailing! 📧**
