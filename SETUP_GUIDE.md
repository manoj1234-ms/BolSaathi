# BolSaathi Backend & Frontend Setup Guide

## ✅ Backend Fixes Applied

### 1. **Database Connection**
- ✅ Improved error handling with clear IP whitelist instructions
- ✅ Added database name to connection string (`bolsaathi`)
- ✅ Added connection timeout settings

### 2. **Controllers Fixed**
- ✅ **Dashboard Controller**: Added streak tracking logic
- ✅ **Progress Controller**: Fixed weekly data mapping to show actual data
- ✅ **Lesson Controller**: Fixed lesson completion logic, added achievement checking
- ✅ **Achievement Controller**: Fixed field name consistency
- ✅ **Game Controller**: Added achievement checking after game completion
- ✅ **Recording Controller**: Improved language filtering

### 3. **Features Added**
- ✅ Automatic streak tracking (updates on dashboard load)
- ✅ Achievement auto-awarding after lessons/games
- ✅ Better error handling across all controllers
- ✅ Progress calculation improvements

## 🚀 Setup Instructions

### Step 1: Fix MongoDB IP Whitelist

**This is the current blocker!** You need to whitelist your IP in MongoDB Atlas:

1. Go to: https://cloud.mongodb.com/
2. Log in to your MongoDB Atlas account
3. Select your cluster (Cluster0)
4. Click **"Network Access"** in the left sidebar
5. Click **"Add IP Address"**
6. Choose one:
   - **Option A (Recommended for Production)**: Click **"Add Current IP Address"**
   - **Option B (Development Only)**: Enter `0.0.0.0/0` to allow all IPs
7. Click **"Confirm"**
8. **Wait 1-2 minutes** for changes to take effect

### Step 2: Backend Setup

```bash
cd C:\Users\Yugayatra\Desktop\BolSaathi\backend

# Install dependencies (if not done)
npm install

# Create .env file (already created, but verify it has):
# PORT=5000
# MONGODB_URI=mongodb+srv://seenusharma2022_db_user:m7AzQs8Bw6PSid7f@cluster0.loegxm4.mongodb.net/?appName=Cluster0
# JWT_SECRET=bolsaathi_super_secret_jwt_key_2024_change_in_production
# CLIENT_ORIGIN=http://localhost:5173

# Seed initial data (languages, lessons, achievements)
npm run seed

# Start backend server
npm run dev
```

**Expected Output:**
```
✅ MongoDB connected successfully
📊 Database: bolsaathi
BolSaathi backend listening on port 5000
```

### Step 3: Frontend Setup

```bash
cd C:\Users\Yugayatra\Desktop\BolSaathi\frontend

# Create .env file
# Create a file named .env in the frontend directory with:
VITE_API_BASE_URL=http://localhost:5000/api
VITE_USE_API_MODE=true

# Install dependencies (if not done)
npm install

# Start frontend
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## 🧪 Testing the Setup

### 1. Test Backend Health
Open browser: `http://localhost:5000/api/health`
Should return: `{"status":"ok","message":"BolSaathi backend is running"}`

### 2. Test Frontend Connection
- Open: `http://localhost:5173`
- Check browser console (F12) - should see:
  ```
  🔧 API Configuration: {
    mode: "🌐 API Mode",
    baseURL: "http://localhost:5000/api"
  }
  ```

### 3. Test Signup Flow
1. Go to Signup page
2. Fill in details
3. **Check backend terminal** - OTP will be logged:
   ```
   signup OTP for user@example.com: 123456
   ```
4. Enter OTP from terminal
5. Should successfully signup

### 4. Test Login Flow
1. Go to Login page
2. Enter credentials
3. **Check backend terminal** - OTP will be logged
4. Enter OTP
5. Should successfully login

## 📋 API Endpoints Summary

### Auth
- `POST /api/auth/signup` - Start signup
- `POST /api/auth/verify-signup` - Verify signup OTP
- `POST /api/auth/login` - Start login
- `POST /api/auth/verify-login` - Verify login OTP
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Dashboard
- `GET /api/dashboard` - Get dashboard stats

### Lessons
- `GET /api/lessons/languages` - Get all languages
- `GET /api/lessons/language/:languageId` - Get lessons by language
- `GET /api/lessons/:lessonId` - Get lesson details
- `POST /api/lessons/:lessonId/complete` - Complete lesson

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
- `POST /api/chat` - Send message
- `DELETE /api/chat` - Clear history

### Games
- `POST /api/games/score` - Save game score
- `GET /api/games/scores` - Get user scores

## 🔧 Troubleshooting

### Backend won't start - MongoDB connection error
- **Solution**: Whitelist your IP in MongoDB Atlas (see Step 1)
- Check `.env` file has correct `MONGODB_URI`

### Frontend can't connect to backend
- Check backend is running on port 5000
- Check frontend `.env` has `VITE_API_BASE_URL=http://localhost:5000/api`
- Check CORS settings in backend (should allow `http://localhost:5173`)

### OTP not working
- **Development**: Check backend terminal for OTP code
- OTP expires in 5 minutes
- Can resend OTP using resend endpoints

### 401 Unauthorized errors
- Check JWT token is being sent in Authorization header
- Token format: `Bearer <token>`
- Token expires in 7 days

## 📝 Notes

- **OTP Codes**: In development, OTP codes are logged to the backend console
- **Database**: Uses MongoDB Atlas cloud database
- **Authentication**: JWT-based with OTP verification
- **CORS**: Configured for `http://localhost:5173` (adjust if frontend runs on different port)

## ✅ Next Steps After Setup

1. ✅ Whitelist MongoDB IP
2. ✅ Start backend server
3. ✅ Start frontend server
4. ✅ Test signup/login flow
5. ✅ Test dashboard and other features
6. ✅ Seed database with initial data (`npm run seed`)

---

**Need Help?** Check the error messages in the terminal - they now include helpful instructions!

