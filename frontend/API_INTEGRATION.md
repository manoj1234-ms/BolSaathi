# API Integration Guide - BolSaathi Frontend

## Overview
This document describes how the frontend integrates with the BolSaathi backend API.

## Base Configuration

- **Base URL**: `https://localhost:5173`
- **Authentication**: JWT Token in Authorization header
- **Format**: `Authorization: Bearer <token>`
- **Response Format**: JSON

## Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=https://api.bolsaathi.com/api
```

## API Services

All API services are located in `frontend/src/services/api.js`:

### 1. Authentication APIs (`authService`)
- `signup(name, email, password)` - Create account
- `login(email, password)` - Login user
- `getMe()` - Get logged-in user profile

### 2. Language & Lesson APIs (`languageService`)
- `getAllLanguages()` - Get all supported languages
- `getLessonsByLanguage(languageId)` - Get lessons for a language
- `getLessonDetails(lessonId)` - Get lesson details

### 3. Audio & Recording APIs (`recordingService`)
- `getUploadUrl(userId, lessonId, fileExtension)` - Get Firebase upload URL
- `saveRecording(userId, lessonId, audioUrl, aiFeedback)` - Save recording metadata
- `getUserRecordings(userId)` - Get all user recordings

### 4. AI Integration APIs (`aiService`)
- `analyzeAudio(audioUrl, userId, lessonId)` - Analyze audio and get scores
- `chat(userMessage, language, difficultyLevel)` - Chat with AI

### 5. User Progress APIs (`progressService`)
- `getUserProgress(userId)` - Get user progress (XP, streak, level)
- `updateProgress(userId, lessonId, scores, xpEarned)` - Update progress after lesson

### 6. Gamification APIs (`badgeService`)
- `getAllBadges()` - Get all available badges
- `getUserBadges(userId)` - Get user's earned badges
- `earnBadge(userId, badgeId)` - Assign badge to user

### 7. Admin Panel APIs (`adminService`)
- `addLanguage(name, code)` - Add new language
- `addLesson(languageId, title, prompt, level)` - Add new lesson
- `updateLesson(lessonId, lessonData)` - Update lesson
- `deleteLesson(lessonId)` - Delete lesson
- `getAllUsers()` - Get all users (admin only)

### 8. Additional Services
- `contactService.submit(formData)` - Submit contact form
- `newsletterService.subscribe(email)` - Subscribe to newsletter

## Usage Examples

### Authentication
```javascript
import { authService } from '../services/api';

// Signup
const result = await authService.signup(name, email, password);
if (result.success) {
  const { user, token } = result.data;
  localStorage.setItem('authToken', token);
}

// Login
const result = await authService.login(email, password);
if (result.success) {
  const { user, token } = result.data;
  localStorage.setItem('authToken', token);
}
```

### Fetching Languages
```javascript
import { languageService } from '../services/api';

const response = await languageService.getAllLanguages();
if (response.success) {
  const languages = response.data;
  // Use languages array
}
```

### Recording Audio
```javascript
import { recordingService, aiService } from '../services/api';

// 1. Get upload URL
const uploadResponse = await recordingService.getUploadUrl(userId, lessonId, 'mp3');
const { uploadUrl, filePath } = uploadResponse.data;

// 2. Upload to Firebase (using uploadUrl)
// ... upload audio file ...

// 3. Analyze audio
const analysisResponse = await aiService.analyzeAudio(audioUrl, userId, lessonId);
const scores = analysisResponse.data; // { fluency, pronunciation, clarity, overall }

// 4. Save recording
await recordingService.saveRecording(userId, lessonId, audioUrl, scores);
```

## Error Handling

All API services return a consistent response format:

```javascript
{
  success: boolean,
  data?: any,      // Present if success is true
  error?: string   // Present if success is false
}
```

Use the `handleApiError` utility for consistent error messages:

```javascript
import { handleApiError } from '../services/api';

try {
  const response = await someService.someMethod();
  if (!response.success) {
    console.error(response.error);
  }
} catch (error) {
  const errorMessage = handleApiError(error);
  console.error(errorMessage);
}
```

## Authentication Flow

1. User signs up/logs in
2. Backend returns JWT token
3. Token is stored in `localStorage` as `authToken`
4. Axios interceptor automatically adds token to all requests
5. On 401 errors, token is cleared and user is redirected to login

## Components Using APIs

- **AuthContext**: Uses `authService` for authentication
- **Login/Signup Pages**: Use `authService` for user authentication
- **ContactSection**: Uses `contactService` for form submission
- **Footer**: Uses `newsletterService` for newsletter subscription
- **SupportedLanguages**: Uses `languageService` to fetch languages

## Next Steps

To integrate more features:

1. Create components that use the API services
2. Handle loading and error states
3. Update UI based on API responses
4. Add proper error messages for users

## Testing

To test API integration:

1. Ensure backend is running at `https://api.bolsaathi.com/api`
2. Set `VITE_API_BASE_URL` in `.env` file
3. Test authentication flow
4. Verify API calls in browser DevTools Network tab

