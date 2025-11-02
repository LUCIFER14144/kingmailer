# KingMailer

KingMailer is an integrated email marketing and inbox management platform that combines powerful email sending capabilities with advanced inbox checking features.

## Features

### Email Marketing Platform (Node.js Backend)
- 📧 Send bulk emails via SMTP
- 📊 Campaign management and tracking
- 👥 User authentication and admin panel
- 📝 HTML email template support
- 📈 Subscription management
- 🎯 CSV contact list import

### Inbox Checker (Python Backend)
- 🔍 Search emails across multiple accounts
- 📬 Multi-provider support (Gmail, Yahoo, Outlook)
- 🗂️ Check inbox, spam, and promotions folders
- ⚡ Background search with real-time status
- 🔄 Automatic cleanup of old emails
- 🌐 RESTful API for email operations

## Architecture

KingMailer uses a dual-backend architecture:
- **Email Backend** (Node.js/Express) - Port 3000
- **Inbox Backend** (Python/FastAPI) - Port 8000
- **Unified Frontend** - Single interface for all features

## Project Structure

```
kingmailer/
├── email-backend/          # Node.js email sending service
│   ├── src/
│   │   ├── server.js      # Main Express server
│   │   ├── mail.js        # Email sending logic
│   │   ├── auth.js        # Authentication
│   │   └── admin.js       # Admin functionality
│   ├── public/            # Frontend files
│   └── package.json
│
├── inbox-backend/         # Python inbox checking service
│   ├── main.py           # FastAPI application
│   ├── static/           # Frontend files
│   └── requirements.txt
│
├── frontend/             # Unified frontend (to be created)
└── README.md
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn
- pip

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/LUCIFER14144/kingmailer.git
cd kingmailer
```

2. **Setup Email Backend (Node.js)**
```bash
cd email-backend
npm install
cp .env.example .env
# Edit .env with your SMTP credentials
npm start
```

3. **Setup Inbox Backend (Python)**
```bash
cd inbox-backend
pip install -r requirements.txt
# Create config.json with your email accounts
python main.py
```

## Configuration

### Email Backend (.env)
```env
PORT=3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SESSION_SECRET=your-secret-key
```

### Inbox Backend (config.json)
```json
{
  "accounts": [
    {
      "email": "account1@gmail.com",
      "password": "app-password"
    },
    {
      "email": "account2@yahoo.com",
      "password": "app-password"
    }
  ]
}
```

## Usage

### Starting the Application

1. **Start Email Backend**
```bash
cd email-backend
npm start
```
Access at: http://localhost:3000

2. **Start Inbox Backend**
```bash
cd inbox-backend
python main.py
```
Access at: http://localhost:8000

### API Endpoints

#### Email Backend (Port 3000)
- `POST /api/send-email` - Send single email
- `POST /api/send-bulk` - Send bulk emails
- `POST /api/login` - User authentication
- `GET /api/campaigns` - Get campaigns
- `POST /api/upload-csv` - Upload contact list

#### Inbox Backend (Port 8000)
- `POST /api/search` - Start email search
- `GET /api/search/{id}/status` - Get search status
- `GET /api/search/{id}/results` - Get search results
- `GET /api/accounts` - List configured accounts
- `POST /api/cleanup` - Trigger email cleanup

## Development

### Running in Development Mode

**Email Backend:**
```bash
cd email-backend
npm run dev
```

**Inbox Backend:**
```bash
cd inbox-backend
uvicorn main:app --reload --port 8000
```

## Deployment

### Deploy to Render

Both backends can be deployed to Render using the included `render.yaml` files.

1. Push to GitHub
2. Connect repository to Render
3. Configure environment variables
4. Deploy both services

### Environment Variables for Production

**Email Backend:**
- `PORT`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SESSION_SECRET`

**Inbox Backend:**
- `EMAIL_CONFIG` (JSON string of email accounts)

## Security Notes

⚠️ **Important Security Considerations:**
- Never commit `.env` or `config.json` files
- Use app-specific passwords for email accounts
- Enable 2FA on all email accounts
- Rotate credentials regularly
- Use HTTPS in production
- Implement rate limiting for API endpoints

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Author

LUCIFER14144

## Support

For issues and questions, please open an issue on GitHub.

## Roadmap

- [ ] Unified frontend dashboard
- [ ] Email analytics and reporting
- [ ] Scheduled email campaigns
- [ ] Email template builder
- [ ] Advanced filtering and search
- [ ] Webhook integrations
- [ ] Multi-language support
- [ ] Mobile app

## Acknowledgments

This project combines functionality from:
- email-marketing-platform
- inbox

Both projects have been integrated to create a comprehensive email management solution.
