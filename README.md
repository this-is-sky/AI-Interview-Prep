# 🎯 AI Interview Prep

> **The Ultimate AI-Powered Interview Preparation Platform**

Transform your interview preparation with personalized, AI-generated questions based on your resume. Get instant feedback, track your progress, and boost your confidence before your next interview.

[![GitHub](https://img.shields.io/badge/GitHub-this--is--sky%2FAI--Interview--Prep-blue?logo=github)](https://github.com/this-is-sky/AI-Interview-Prep)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)](https://www.mongodb.com)

---

## ✨ Key Features

### 🔐 **Authentication & Security**
- 🔑 User registration with comprehensive validation
- 🛡️ Password strength enforcement (6+ chars, uppercase, number)
- ✉️ Email verification system
- 🔒 JWT token-based authentication
- 🚪 Secure session management with automatic logout

### 📄 **Smart Resume Management**
- 📤 PDF resume upload with intelligent parsing
- 🔍 Automatic skill extraction from resumes
- 💾 Resume linked to user accounts
- 🎯 Personalized question generation based on skills

### 🤖 **AI-Powered Interview Engine**
- 🎓 **Personalized Questions**: Resume-aware, role-specific questions using Google Gemini AI
- 💼 **Role Selection**: Frontend, Backend, Full Stack, and custom roles
- 📊 **3 Difficulty Levels**: Easy, Medium, Hard with adaptive questions
- 🔢 **Flexible Sessions**: Choose 5, 10, or 15 questions per interview
- ⏱️ **Real-time Timer**: Session timer with MM:SS countdown
- 💡 **Smart Hints**: Context-aware hints based on difficulty level
- 🎯 **AI Scoring**: Intelligent evaluation with 0-10 scale
- 📝 **Rich Feedback**: Markdown-formatted feedback and explanations

### 📊 **Advanced Analytics**
- 📈 **Interview History**: Complete record with filtering
- 🎯 **Performance Dashboard**: 
  - Overall statistics and trends
  - Role-wise performance breakdown
  - Difficulty-wise analysis
  - Progress charts and insights
- 🔍 **Searchable History**: Filter by role, date, or score
- 📉 **Improvement Tracking**: Visualize your growth

### 🎨 **Modern User Interface**
- ✨ Clean, intuitive design
- 📱 Fully responsive (desktop, tablet, mobile)
- 🎨 Tailwind CSS v4 with custom styling
- ⚡ Fast, smooth interactions
- 🎯 User-friendly guidance throughout

---

## 🚀 Live Demo

Coming soon!

---

## 🛠️ Tech Stack

### **Frontend**
```
React 19
TypeScript 5.x
Vite (Build Tool)
Tailwind CSS v4
React Router v6
Axios (HTTP Client)
Context API (State Management)
```

### **Backend**
```
Node.js 18+
Express.js 5.x
TypeScript 5.x
MongoDB + Mongoose
JWT Authentication
bcrypt (Password Hashing)
Google Gemini AI 2.5-flash
pdf-parse (Resume Parsing)
multer (File Upload)
```

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Environment Setup](#environment-setup)
- [Features Deep Dive](#features-deep-dive)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)
- Google Gemini API key

### Installation (5 minutes)

**1. Clone Repository**
```bash
git clone https://github.com/this-is-sky/AI-Interview-Prep.git
cd AI-Interview-Prep
```

**2. Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

**3. Frontend Setup** (new terminal)
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with backend URL
npm run dev
```

**4. Access Application**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

---

## 📁 Project Structure

```
AI-Interview-Prep/
├── 📂 backend/
│   ├── src/
│   │   ├── app.ts                  # Express app setup
│   │   ├── server.ts               # Server entry point
│   │   ├── config/
│   │   │   └── db.ts               # MongoDB connection
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts  # JWT verification
│   │   ├── models/
│   │   │   ├── user.models.ts      # User schema
│   │   │   └── interivew.models.ts # Interview session schema
│   │   ├── routes/
│   │   │   ├── auth.routes.ts      # Authentication endpoints
│   │   │   ├── interview.routes.ts # Interview endpoints
│   │   │   ├── resume.routes.ts    # Resume endpoints
│   │   │   └── health.routes.ts    # Health check
│   │   ├── services/
│   │   │   ├── ai.services.ts      # AI question generation
│   │   │   └── resume.service.ts   # Resume parsing
│   │   └── controller/
│   │       └── resume.controller.ts # Upload handling
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│
├── 📂 frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.ts           # Axios setup
│   │   ├── components/
│   │   │   ├── Layout.tsx          # Main layout
│   │   │   └── ProtectedRoute.tsx  # Auth guard
│   │   ├── context/
│   │   │   └── AuthContext.tsx     # Auth state
│   │   ├── hooks/
│   │   │   └── useAuth.ts          # Auth hook
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Landing page
│   │   │   ├── Login.tsx           # Login page
│   │   │   ├── Register.tsx        # Signup page
│   │   │   ├── Dashboard.tsx       # User hub
│   │   │   ├── ResumeUpload.tsx    # Resume upload
│   │   │   ├── InterviewStart.tsx  # Interview setup
│   │   │   ├── InterviewSession.tsx # Active interview
│   │   │   ├── InterviewResult.tsx # Results page
│   │   │   ├── InterviewHistory.tsx # Past interviews
│   │   │   └── Statistics.tsx      # Analytics
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── .env.example
│   └── vite.config.ts
│
├── README.md                        # This file
├── .gitignore
```

---

## 📡 API Documentation

### Base URL
- **Development**: `http://localhost:3000`

### Authentication Endpoints

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}

Response:
{
  "token": "jwt_token_here",
  "user": { "id": "...", "email": "john@example.com" }
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}

Response:
{
  "token": "jwt_token_here",
  "user": { "id": "...", "email": "john@example.com" }
}
```

#### Get Profile
```bash
GET /api/auth/profile
Authorization: Bearer <token>

Response:
{
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "resumeText": "Your resume content...",
    "isEmailVerified": true
  }
}
```

### Interview Endpoints

#### Create Interview Session
```bash
POST /api/interview
Authorization: Bearer <token>
Content-Type: application/json

{
  "role": "Frontend Developer",
  "difficulty": "medium",
  "questionCount": 5
}

Response:
{
  "sessionId": "...",
  "questions": [
    { "id": 1, "text": "Question 1?", "hints": [...] },
    ...
  ]
}
```

#### Submit Answer
```bash
POST /api/interview/:id/answer
Authorization: Bearer <token>
Content-Type: application/json

{
  "questionIndex": 0,
  "userAnswer": "Your answer here..."
}

Response:
{
  "score": 7,
  "feedback": "Great answer! You could improve by...",
  "nextQuestion": { "id": 2, "text": "..." }
}
```

#### Get Interview Result
```bash
GET /api/interview/:id/result
Authorization: Bearer <token>

Response:
{
  "sessionId": "...",
  "role": "Frontend Developer",
  "difficulty": "medium",
  "totalScore": 34,
  "averageScore": 6.8,
  "completedAt": "2024-02-01T10:30:00Z",
  "answers": [...]
}
```

#### Get Interview History
```bash
GET /api/interview/history
Authorization: Bearer <token>

Response:
{
  "interviews": [
    { "id": "...", "role": "Frontend", "score": 35, "date": "..." },
    ...
  ]
}
```

#### Get Statistics
```bash
GET /api/interview/statistics
Authorization: Bearer <token>

Response:
{
  "totalInterviews": 5,
  "averageScore": 6.8,
  "bestScore": 8.5,
  "worseScore": 5.2,
  "byRole": { "Frontend": 6.5, "Backend": 7.0 },
  "byDifficulty": { "easy": 7.5, "medium": 6.8, "hard": 5.5 }
}
```

### Resume Endpoints

#### Upload Resume
```bash
POST /api/resume/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

Files:
  - file: resume.pdf

Response:
{
  "message": "Resume uploaded successfully",
  "text": "Extracted resume text..."
}
```

### Health Check
```bash
GET /api/health

Response:
{
  "status": "ok",
  "timestamp": "2024-02-01T10:30:00Z"
}
```

---

## 🔧 Environment Setup

### Backend `.env`
```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/interview_prep

# Authentication
JWT_SECRET=your_super_secret_key_here

# AI
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend `.env.local`
```env
# API
VITE_API_URL=http://localhost:3000
```

---

## 📚 Features Deep Dive

### Smart Question Generation
- **Resume Analysis**: Extracts skills from your resume
- **Role-Based**: Generates relevant questions for selected role
- **Difficulty Adaptive**: Easy/Medium/Hard questions
- **Real Scenarios**: Based on actual interview patterns

### Intelligent Scoring
- **Context-Aware**: Evaluates answers in context
- **Detailed Feedback**: Explains why you got the score
- **Areas of Improvement**: Suggests what to work on
- **Industry Standards**: Compared to expected answers

### Progress Tracking
- **Historical Data**: All interviews saved
- **Trend Analysis**: See improvement over time
- **Performance Metrics**: Detailed breakdowns by role/difficulty
- **Insights**: Visual charts and statistics

---



## 🐛 Troubleshooting

### Frontend Issues

**Blank page on startup**
```bash
# Clear browser cache
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**API calls failing**
- Check `VITE_API_URL` in `.env.local`
- Verify backend is running on correct port
- Check browser DevTools → Network tab

### Backend Issues

**MongoDB connection error**
```bash
# Verify MongoDB is running
# Check MONGO_URI in .env
# Test connection: mongosh
```

**Port already in use**
```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>
```

**Gemini API errors**
- Verify API key is valid
- Check API quota at https://aistudio.google.com
- Ensure API is enabled

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use meaningful commit messages
- Add comments for complex logic
- Test features before submitting PR

---

## 📝 Validation Rules

### Email
✅ Valid email format required
```regex
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### Password
✅ Minimum 6 characters
✅ At least 1 uppercase letter
✅ At least 1 number
```regex
/^(?=.*[A-Z])(?=.*\d).{6,}$/
```

### Resume
✅ PDF format only
✅ Maximum file size: 5MB

---

## 📊 Performance

- ⚡ Frontend Load Time: ~2s
- ⚡ API Response Time: <500ms
- ⚡ Database Queries: Indexed and optimized
- ⚡ AI Response: ~3-5 seconds per question

---

## 🔐 Security Features

- 🔒 Password hashing with bcrypt
- 🔒 JWT token authentication
- 🔒 Environment variables for secrets
- 🔒 CORS enabled for frontend only
- 🔒 Input validation on all endpoints
- 🔒 Protected routes requiring authentication
- 🔒 Secure file upload handling

---

## 📦 Dependencies

### Key Packages
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `@google/generative-ai` - AI integration
- `jwt` - Token management
- `bcrypt` - Password hashing
- `pdf-parse` - Resume parsing
- `react` - UI library
- `tailwindcss` - Styling
- `axios` - HTTP client

See `package.json` files for complete lists.

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 🎉 Success Stories

### What You Can Achieve
- ✅ Practice real interview questions
- ✅ Get instant AI feedback
- ✅ Track your improvement
- ✅ Build confidence
- ✅ Land your dream job!

---

## 📞 Support & Contact

- 📧 Email: support@ai-interview-prep.com
- 🐛 Bug Reports: GitHub Issues
- 💡 Feature Requests: GitHub Discussions
- 📖 Documentation: See guides above

---

## 🙏 Acknowledgments

- Google Gemini AI for question generation
- MongoDB for database
- React and Tailwind communities
- All contributors and users

---

## 🎯 Future Roadmap

- [ ] Video interview support
- [ ] Mobile app (React Native)
- [ ] Mock interview recording
- [ ] PDF report export
- [ ] Social authentication
- [ ] Interview scheduling
- [ ] Performance comparison
- [ ] Custom question types
- [ ] Multi-language support

---

**Built with ❤️ for interview success**

⭐ If this project helps you, please give it a star! ⭐
