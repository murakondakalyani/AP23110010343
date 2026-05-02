# Notification Aggregation System

A full-stack application that fetches notifications from an external API, prioritizes them, and displays them in a clean UI with filtering.

---

## 🚀 Features

- Fetch notifications from external API
- Priority-based sorting:
  - Placement > Event > Result
- Category filtering (All / Placement / Event / Result)
- Responsive UI using Material UI
- Backend API with Express
- Logging middleware integration

---

## 🏗️ Architecture
Frontend (React)
↓
Backend (Node.js + Express)
↓
External Evaluation API


Flow:

React → Express API → External API → Process → Return → Display


---

## 🧠 Backend Logic

- Fetch notifications using `axios`
- Authenticate using Bearer token
- Sort notifications using priority map
- Return top 10 notifications

Priority:
```js
Placement > Event > Result
🎨 Frontend Logic
Fetch data from backend API
Store in state
Filter using dropdown
Render cards using Material UI
⚙️ Setup Instructions
🔹 Clone Repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
🔹 Backend Setup
cd notification_app_be
npm install

Create .env file:

ACCESS_TOKEN=your_token_here

Run server:

npm start

Server runs at:

http://localhost:5000
🔹 Frontend Setup
cd notification_app_fe
npm install
npm start

App runs at:

http://localhost:3000
🔗 API Endpoint
Get Notifications
GET http://localhost:5000/api/notifications

Response:

{
  "count": 10,
  "data": [
    {
      "ID": "...",
      "Type": "Placement",
      "Message": "...",
      "Timestamp": "..."
    }
  ]
}
📸 Screenshots
Postman Output

Backend Running

Frontend UI

Filter Feature

📁 Project Structure
AP23110010343/
│
├── notification_app_be/
├── notification_app_fe/
├── logging_middleware/
├── screenshots/
├── notification_system_design.md
⚠️ Challenges Faced
Token expiration (401 errors)
API endpoint mismatches
Data mapping issues between frontend & backend
JSON formatting errors
🔮 Future Improvements
Real-time notifications (WebSockets)
Pagination / infinite scroll
Admin panel to manage notifications
Token auto-refresh system
✅ Submission Notes
All API calls are made through backend
Screenshots include:
Postman request & response
Backend running
Frontend UI
No direct use of test server in frontend
👩‍💻 Author

Murakonda Kalyani
Roll No: AP23110010343




1. Create file:
```bash
README.md
Paste above content
Update:
YOUR_USERNAME / YOUR_REPO
Push:
git add README.md
git commit -m "Added README"
git push