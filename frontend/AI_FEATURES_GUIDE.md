# AI Features Implementation Guide

## Overview
Currently, all AI features use **mock data** for demonstration. To make them work with real AI, you need to integrate actual AI APIs.

---

## 1. AI Chat (Conversation Practice)

### Current Status: Mock Responses
### How to Make it Real:

**Option 1: OpenAI GPT API**
```javascript
// In aiService.js - generateAIResponse function
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

export const generateAIResponse = async (userMessage, personality, context) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a ${personality} language tutor teaching Indian languages. 
                  Help students practice conversations naturally.`
      },
      {
        role: "user",
        content: userMessage
      }
    ],
    temperature: 0.7,
  });
  
  return {
    message: response.choices[0].message.content,
    personality: AI_PERSONALITIES[personality],
    suggestions: extractSuggestions(response.choices[0].message.content)
  };
};
```

**Option 2: Google Gemini API**
```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

export const generateAIResponse = async (userMessage, personality) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `As a ${personality} language tutor, respond to: ${userMessage}`;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
};
```

**Option 3: Anthropic Claude API**
```javascript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.VITE_ANTHROPIC_API_KEY,
});

export const generateAIResponse = async (userMessage, personality) => {
  const message = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content: userMessage
    }]
  });
  
  return message.content[0].text;
};
```

---

## 2. AI Translation Assistant

### Current Status: Mock Translations
### How to Make it Real:

**Option 1: Google Translate API**
```javascript
import { Translate } from '@google-cloud/translate/build/src/v2';

const translate = new Translate({
  key: process.env.VITE_GOOGLE_TRANSLATE_API_KEY
});

export const translateText = async (text, fromLang, toLang) => {
  const [translation] = await translate.translate(text, {
    from: fromLang,
    to: toLang
  });
  
  return translation;
};
```

**Option 2: Azure Translator**
```javascript
import axios from 'axios';

export const translateText = async (text, fromLang, toLang) => {
  const response = await axios.post(
    'https://api.cognitive.microsofttranslator.com/translate',
    [{ text }],
    {
      params: {
        'api-version': '3.0',
        from: fromLang,
        to: toLang
      },
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.VITE_AZURE_TRANSLATE_KEY,
        'Ocp-Apim-Subscription-Region': 'your-region',
        'Content-Type': 'application/json'
      }
    }
  );
  
  return response.data[0].translations[0].text;
};
```

---

## 3. AI Writing Assistant

### Current Status: Mock Analysis
### How to Make it Real:

**Option 1: OpenAI for Grammar Check**
```javascript
export const analyzeWriting = async (text, language) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `Analyze this ${language} text for grammar, vocabulary, and style. 
                  Provide a score (0-100) and specific suggestions.`
      },
      {
        role: "user",
        content: text
      }
    ]
  });
  
  // Parse response to extract scores and suggestions
  return parseWritingAnalysis(response.choices[0].message.content);
};
```

**Option 2: LanguageTool API (Free)**
```javascript
import axios from 'axios';

export const analyzeWriting = async (text, language) => {
  const response = await axios.post(
    'https://api.languagetool.org/v2/check',
    {
      text: text,
      language: language
    }
  );
  
  return {
    score: calculateScore(response.data.matches),
    grammar: 100 - (response.data.matches.length * 5),
    suggestions: response.data.matches.map(match => ({
      original: match.context.text,
      corrected: match.replacements[0]?.value,
      reason: match.message
    }))
  };
};
```

---

## 4. AI Pronunciation Analysis

### Current Status: Mock Scores
### How to Make it Real:

**Option 1: Google Cloud Speech-to-Text + Custom Analysis**
```javascript
import speech from '@google-cloud/speech';

const client = new speech.SpeechClient({
  keyFilename: 'path-to-key.json'
});

export const analyzePronunciation = async (audioBlob, targetText) => {
  // Convert audio blob to base64
  const audioBytes = await blobToBase64(audioBlob);
  
  // Transcribe audio
  const [response] = await client.recognize({
    audio: { content: audioBytes },
    config: {
      encoding: 'WEBM_OPUS',
      sampleRateHertz: 16000,
      languageCode: 'hi-IN', // or target language
      enableWordTimeOffsets: true
    }
  });
  
  const transcription = response.results[0].alternatives[0].transcript;
  
  // Compare with target text
  return {
    accuracy: calculateAccuracy(transcription, targetText),
    pronunciation: analyzePhonemes(transcription, targetText),
    fluency: calculateFluency(response.results[0].alternatives[0].words),
    feedback: generateFeedback(transcription, targetText)
  };
};
```

**Option 2: AssemblyAI (Easier)**
```javascript
import axios from 'axios';

export const analyzePronunciation = async (audioBlob, targetText) => {
  // Upload audio
  const uploadResponse = await axios.post(
    'https://api.assemblyai.com/v2/upload',
    audioBlob,
    {
      headers: {
        authorization: process.env.VITE_ASSEMBLYAI_API_KEY
      }
    }
  );
  
  // Transcribe
  const transcriptResponse = await axios.post(
    'https://api.assemblyai.com/v2/transcript',
    {
      audio_url: uploadResponse.data.upload_url,
      language_code: 'hi' // target language
    },
    {
      headers: {
        authorization: process.env.VITE_ASSEMBLYAI_API_KEY
      }
    }
  );
  
  // Get results
  const result = await axios.get(
    `https://api.assemblyai.com/v2/transcript/${transcriptResponse.data.id}`,
    {
      headers: {
        authorization: process.env.VITE_ASSEMBLYAI_API_KEY
      }
    }
  );
  
  return analyzePronunciationResult(result.data.text, targetText);
};
```

---

## 5. AI Games Generation

### Current Status: Static Games
### How to Make it Real:

**Using OpenAI to Generate Games**
```javascript
export const generateLanguageGame = async (type, difficulty, language) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `Generate a ${type} language game for ${language} at ${difficulty} level.
                  Return JSON with game data.`
      }
    ],
    response_format: { type: "json_object" }
  });
  
  return JSON.parse(response.choices[0].message.content);
};
```

---

## 6. AI Progress Prediction

### Current Status: Simple Calculation
### How to Make it Real:

**Using Machine Learning Model**
```javascript
export const predictProgress = async (userData) => {
  // Send user data to your ML model API
  const response = await axios.post(
    'https://your-ml-api.com/predict',
    {
      currentLevel: userData.currentLevel,
      studyHours: userData.studyHours,
      consistency: userData.consistency,
      accuracy: userData.accuracy,
      lessonsCompleted: userData.lessonsCompleted
    }
  );
  
  return response.data;
};
```

**Or Use OpenAI for Predictions**
```javascript
export const predictProgress = async (userData) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `Based on this user data, predict their learning progress:
                  ${JSON.stringify(userData)}
                  Return JSON with predictions.`
      }
    ],
    response_format: { type: "json_object" }
  });
  
  return JSON.parse(response.choices[0].message.content);
};
```

---

## 7. AI Error Analysis

### Current Status: Mock Data
### How to Make it Real:

**Track Real User Errors**
```javascript
// Store errors in database
export const trackError = async (userId, errorType, details) => {
  await axios.post('/api/errors', {
    userId,
    errorType,
    details,
    timestamp: new Date()
  });
};

// Analyze errors
export const analyzeErrors = async (userId) => {
  const errors = await axios.get(`/api/errors/${userId}`);
  
  // Group by type
  const grouped = groupBy(errors.data, 'errorType');
  
  // Calculate frequency
  const commonMistakes = Object.entries(grouped)
    .map(([type, items]) => ({
      mistake: type,
      frequency: items.length,
      suggestion: getSuggestion(type)
    }))
    .sort((a, b) => b.frequency - a.frequency);
  
  return {
    commonMistakes,
    weakAreas: identifyWeakAreas(grouped),
    strongAreas: identifyStrongAreas(userId),
    improvementRate: calculateImprovementRate(userId)
  };
};
```

---

## Environment Variables Setup

Create `.env` file in `frontend/`:

```env
# OpenAI
VITE_OPENAI_API_KEY=your_openai_key_here

# Google Cloud
VITE_GOOGLE_TRANSLATE_API_KEY=your_google_key_here
VITE_GOOGLE_CLOUD_PROJECT_ID=your_project_id

# Azure
VITE_AZURE_TRANSLATE_KEY=your_azure_key_here
VITE_AZURE_TRANSLATE_REGION=your_region

# AssemblyAI
VITE_ASSEMBLYAI_API_KEY=your_assemblyai_key_here

# Your Backend API
VITE_API_BASE_URL=https://api.bolsaathi.com/api
```

---

## Step-by-Step Implementation

### Step 1: Choose Your AI Provider
- **Free Tier**: Google Gemini, Hugging Face
- **Paid but Powerful**: OpenAI GPT-4, Anthropic Claude
- **Specialized**: Google Cloud Speech, AssemblyAI

### Step 2: Get API Keys
1. Sign up for chosen provider
2. Get API key
3. Add to `.env` file

### Step 3: Update aiService.js
Replace mock functions with real API calls

### Step 4: Handle Errors
```javascript
try {
  const result = await aiFunction();
  return result;
} catch (error) {
  console.error('AI Error:', error);
  // Fallback to mock data
  return getMockData();
}
```

### Step 5: Add Rate Limiting
```javascript
// Prevent too many API calls
const rateLimiter = {
  lastCall: 0,
  minInterval: 1000 // 1 second
};

export const rateLimitedCall = async (fn) => {
  const now = Date.now();
  if (now - rateLimiter.lastCall < rateLimiter.minInterval) {
    await new Promise(resolve => 
      setTimeout(resolve, rateLimiter.minInterval - (now - rateLimiter.lastCall))
    );
  }
  rateLimiter.lastCall = Date.now();
  return fn();
};
```

---

## Cost Estimation

### OpenAI GPT-4
- ~$0.03 per 1K tokens
- Chat: ~500 tokens per conversation = $0.015
- Translation: ~100 tokens = $0.003

### Google Translate
- First 500K characters/month: FREE
- After: $20 per 1M characters

### AssemblyAI
- First 5 hours/month: FREE
- After: $0.00025 per second

---

## Recommended Setup for BolSaathi

1. **AI Chat**: OpenAI GPT-3.5-turbo (cheaper) or GPT-4
2. **Translation**: Google Translate API (free tier available)
3. **Writing**: LanguageTool API (free) + OpenAI for style
4. **Pronunciation**: AssemblyAI (free tier) or Google Cloud Speech
5. **Games**: OpenAI GPT-3.5-turbo (cheaper)
6. **Predictions**: Your own ML model or OpenAI

---

## Testing

Test each feature with real API before deploying:

```javascript
// Test function
const testAIFeature = async () => {
  try {
    const result = await generateAIResponse("Hello", "friendly");
    console.log("✅ AI Chat works:", result);
  } catch (error) {
    console.error("❌ AI Chat failed:", error);
  }
};
```

---

## Security Notes

1. **Never expose API keys in frontend code**
2. **Use backend proxy** for sensitive APIs
3. **Implement rate limiting**
4. **Validate user input** before sending to AI
5. **Sanitize AI responses** before displaying

---

## Next Steps

1. Choose AI providers
2. Get API keys
3. Update `aiService.js` with real implementations
4. Test each feature
5. Deploy with environment variables
6. Monitor usage and costs

