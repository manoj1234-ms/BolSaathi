# BolSaathi Backend API

Complete backend API for BolSaathi language learning platform with authentication, lessons, progress tracking, achievements, recordings, AI chat, and games.

## Features

- ✅ **Authentication** - Signup/Login with OTP verification
- ✅ **Dashboard** - User stats, recent activity, AI recommendations
- ✅ **Lessons** - Language lessons with progress tracking
- ✅ **Progress** - Track learning progress, weekly activity, language progress
- ✅ **Achievements** - Gamification with badges and XP
- ✅ **Recordings** - Save and manage pronunciation practice recordings
- ✅ **AI Chat** - Conversation practice with AI tutor
- ✅ **Games** - Language learning games with score tracking

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://seenusharma2022_db_user:m7AzQs8Bw6PSid7f@cluster0.loegxm4.mongodb.net/?appName=Cluster0
JWT_SECRET=your-secret-key-change-this
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Seed Initial Data

Run the seed script to populate languages, lessons, and achievements:

```bash
npm run seed
```

### 4. Start Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Signup with OTP
- `POST /api/auth/verify-signup` - Verify signup OTP
- `POST /api/auth/resend-signup-otp` - Resend signup OTP
- `POST /api/auth/login` - Login (sends OTP)
- `POST /api/auth/verify-login` - Verify login OTP
- `POST /api/auth/resend-login-otp` - Resend login OTP
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Dashboard
- `GET /api/dashboard` - Get dashboard stats and data

### Lessons
- `GET /api/lessons/languages` - Get all languages
- `GET /api/lessons/language/:languageId` - Get lessons by language
- `GET /api/lessons/:lessonId` - Get lesson details
- `POST /api/lessons/:lessonId/complete` - Complete a lesson

### Progress
- `GET /api/progress` - Get user progress
- `POST /api/progress/update` - Update progress

### Achievements
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/user` - Get user achievements

### Recordings
- `GET /api/recordings` - Get user recordings
- `POST /api/recordings` - Save recording
- `DELETE /api/recordings/:recordingId` - Delete recording

### Chat
- `GET /api/chat` - Get chat history
- `POST /api/chat` - Save chat message
- `DELETE /api/chat` - Clear chat history

### Games
- `POST /api/games/score` - Save game score
- `GET /api/games/scores` - Get user game scores

### Users
- `PUT /api/users/me` - Update user profile

## Database Models

- **User** - User accounts with email verification
- **OtpToken** - OTP codes for authentication
- **Language** - Supported languages
- **Lesson** - Language lessons
- **Progress** - User learning progress
- **Achievement** - Available achievements
- **UserAchievement** - User's earned achievements
- **Recording** - Pronunciation practice recordings
- **Activity** - User activity log
- **ChatMessage** - AI chat conversation history
- **GameScore** - Game scores and XP

## Frontend Connection

The frontend should set `VITE_API_BASE_URL=http://localhost:5000/api` in `.env` file to connect to this backend.

## Notes

- OTP codes are logged to console in development (check server logs)
- All protected routes require JWT token in `Authorization: Bearer <token>` header
- Progress and achievements are automatically calculated and awarded
