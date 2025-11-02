#!/bin/bash

echo "========================================"
echo "   Starting KingMailer"
echo "========================================"
echo ""

echo "Starting Email Backend (Node.js)..."
cd email-backend
npm start &
EMAIL_PID=$!
cd ..

sleep 3

echo "Starting Inbox Backend (Python)..."
cd inbox-backend
python main.py &
INBOX_PID=$!
cd ..

sleep 3

echo ""
echo "========================================"
echo "   KingMailer Started!"
echo "========================================"
echo ""
echo "Email Backend: http://localhost:3000"
echo "Inbox Backend: http://localhost:8000"
echo "Frontend: Open frontend/index.html in browser"
echo ""
echo "Process IDs:"
echo "Email Backend PID: $EMAIL_PID"
echo "Inbox Backend PID: $INBOX_PID"
echo ""
echo "To stop the servers, run:"
echo "kill $EMAIL_PID $INBOX_PID"
echo ""

# Open frontend in default browser (works on most Linux systems)
if command -v xdg-open > /dev/null; then
    xdg-open frontend/index.html
elif command -v open > /dev/null; then
    open frontend/index.html
fi

# Keep script running
wait
