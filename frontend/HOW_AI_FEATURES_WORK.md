# AI Features कैसे काम करेंगे - Complete Guide

## 📋 Current Status
अभी सभी AI features **Mock Data** use कर रहे हैं (demo के लिए)। Real AI integrate करने के लिए नीचे steps follow करें।

---

## 1. 🤖 AI Chat (Conversation Practice)

### कैसे काम करता है:
1. User message type करता है
2. AI service को message भेजा जाता है
3. AI response generate करता है
4. Response user को दिखाया जाता है

### Real AI Integration:

**OpenAI GPT-4 Use करें:**
```javascript
// frontend/src/services/aiService.js में update करें

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export const generateAIResponse = async (userMessage, personality = "friendly", context = {}) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a ${personality} language tutor teaching Indian languages. 
                    Help students practice conversations naturally. Respond in a ${personality} style.`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });
    
    return {
      message: response.choices[0].message.content,
      personality: AI_PERSONALITIES[personality],
      suggestions: generateSuggestions(response.choices[0].message.content)
    };
  } catch (error) {
    console.error('AI Error:', error);
    // Fallback to mock
    return getMockResponse(userMessage, personality);
  }
};
```

**Setup:**
1. OpenAI account बनाएं: https://platform.openai.com
2. API key लें
3. `.env` file में add करें: `VITE_OPENAI_API_KEY=your_key_here`
4. Package install: `npm install openai`

---

## 2. 🌐 AI Translation Assistant

### कैसे काम करता है:
1. User text enter करता है
2. Source और target language select करता है
3. Translation API को request भेजी जाती है
4. Translated text show होता है

### Real AI Integration:

**Google Translate API:**
```javascript
// frontend/src/services/aiService.js में update करें

export const translateText = async (text, fromLang, toLang) => {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: fromLang,
          target: toLang,
          format: 'text'
        })
      }
    );
    
    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation Error:', error);
    return `[Translation Error: ${error.message}]`;
  }
};
```

**Setup:**
1. Google Cloud Console में जाएं
2. Translation API enable करें
3. API key बनाएं
4. `.env` में add करें: `VITE_GOOGLE_TRANSLATE_KEY=your_key`

**Free Tier:** पहले 500,000 characters/month FREE

---

## 3. ✍️ AI Writing Assistant

### कैसे काम करता है:
1. User text लिखता है
2. AI grammar, vocabulary, style check करता है
3. Score और suggestions देता है
4. Corrections highlight करता है

### Real AI Integration:

**LanguageTool API (FREE):**
```javascript
export const analyzeWriting = async (text, language) => {
  try {
    const response = await fetch(
      'https://api.languagetool.org/v2/check',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          text: text,
          language: language === 'hi' ? 'hi' : 'en-US'
        })
      }
    );
    
    const data = await response.json();
    
    // Calculate scores
    const totalWords = text.split(/\s+/).length;
    const errors = data.matches.length;
    const accuracy = Math.max(0, 100 - (errors * 5));
    
    return {
      score: accuracy,
      grammar: accuracy,
      vocabulary: 85, // Can be enhanced with vocabulary analysis
      suggestions: data.matches.map(match => match.message),
      corrections: data.matches.map(match => ({
        original: match.context.text.substring(
          match.context.offset,
          match.context.offset + match.context.length
        ),
        corrected: match.replacements[0]?.value || '',
        reason: match.message
      }))
    };
  } catch (error) {
    console.error('Writing Analysis Error:', error);
    return getMockWritingAnalysis();
  }
};
```

**Setup:**
- LanguageTool API FREE है, कोई key नहीं चाहिए
- Direct use कर सकते हैं

---

## 4. 🎤 AI Pronunciation Analysis

### कैसे काम करता है:
1. User audio record करता है
2. Audio file AI service को भेजी जाती है
3. AI speech-to-text करता है
4. Target text से compare करता है
5. Accuracy score और feedback देता है

### Real AI Integration:

**AssemblyAI (Easier - FREE tier available):**
```javascript
export const analyzePronunciation = async (audioBlob, targetText) => {
  try {
    // Step 1: Upload audio
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');
    
    const uploadResponse = await fetch(
      'https://api.assemblyai.com/v2/upload',
      {
        method: 'POST',
        headers: {
          authorization: import.meta.env.VITE_ASSEMBLYAI_API_KEY
        },
        body: formData
      }
    );
    
    const { upload_url } = await uploadResponse.json();
    
    // Step 2: Start transcription
    const transcriptResponse = await fetch(
      'https://api.assemblyai.com/v2/transcript',
      {
        method: 'POST',
        headers: {
          authorization: import.meta.env.VITE_ASSEMBLYAI_API_KEY,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          audio_url: upload_url,
          language_code: 'hi' // or target language
        })
      }
    );
    
    const { id } = await transcriptResponse.json();
    
    // Step 3: Poll for results
    let result;
    while (true) {
      const checkResponse = await fetch(
        `https://api.assemblyai.com/v2/transcript/${id}`,
        {
          headers: {
            authorization: import.meta.env.VITE_ASSEMBLYAI_API_KEY
          }
        }
      );
      
      result = await checkResponse.json();
      
      if (result.status === 'completed' || result.status === 'error') {
        break;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Step 4: Analyze pronunciation
    const transcribedText = result.text;
    const accuracy = calculateSimilarity(transcribedText, targetText);
    
    return {
      accuracy: Math.round(accuracy * 100),
      pronunciation: Math.round(accuracy * 100),
      fluency: calculateFluency(result.words),
      feedback: generateFeedback(transcribedText, targetText),
      mistakes: findMistakes(transcribedText, targetText)
    };
  } catch (error) {
    console.error('Pronunciation Analysis Error:', error);
    return getMockPronunciationAnalysis();
  }
};

// Helper function to calculate similarity
function calculateSimilarity(str1, str2) {
  // Use Levenshtein distance or similar algorithm
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  const editDistance = levenshteinDistance(str1, str2);
  return (longer.length - editDistance) / longer.length;
}
```

**Setup:**
1. AssemblyAI account: https://www.assemblyai.com
2. API key लें (FREE: 5 hours/month)
3. `.env` में add करें: `VITE_ASSEMBLYAI_API_KEY=your_key`

---

## 5. 🎮 AI Games Generation

### कैसे काम करता है:
1. User game type select करता है
2. AI game content generate करता है
3. Game play होता है
4. Score track होता है

### Real AI Integration:

**OpenAI GPT-3.5-turbo (Cheaper):**
```javascript
export const generateLanguageGame = async (type, difficulty, language) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Generate a ${type} language game for ${language} at ${difficulty} level.
                    Return JSON with game data including questions, answers, and options.`
        },
        {
          role: "user",
          content: `Create a ${type} game with 5 questions for ${language} ${difficulty} level.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7
    });
    
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Game Generation Error:', error);
    return getMockGame(type, difficulty, language);
  }
};
```

---

## 6. 📊 AI Progress Prediction

### कैसे काम करता है:
1. User data collect होता है (level, hours, consistency)
2. ML model या AI से prediction मांगी जाती है
3. Future progress predict होता है
4. Recommendations generate होती हैं

### Real AI Integration:

**OpenAI for Predictions:**
```javascript
export const predictProgress = async (currentLevel, studyHours, consistency) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a learning analytics expert. Predict language learning progress based on:
                    - Current Level: ${currentLevel}
                    - Daily Study Hours: ${studyHours}
                    - Consistency: ${consistency}
                    Return JSON with predictions and recommendations.`
        }
      ],
      response_format: { type: "json_object" }
    });
    
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    // Fallback calculation
    const weeksToNextLevel = Math.ceil((100 - currentLevel) / (studyHours * consistency * 0.1));
    return {
      currentLevel,
      predictedLevel: Math.min(100, currentLevel + (studyHours * consistency * 0.1)),
      weeksToNextLevel,
      confidence: consistency > 0.7 ? "High" : "Medium",
      recommendations: []
    };
  }
};
```

---

## 7. 🔍 AI Error Analysis

### कैसे काम करता है:
1. User errors database में store होते हैं
2. Errors analyze होते हैं (frequency, patterns)
3. Weak areas identify होते हैं
4. Personalized suggestions generate होती हैं

### Real Implementation:

**Backend API बनाएं:**
```javascript
// Backend: /api/errors/track
// Store errors in database

// Frontend: Track errors
export const trackError = async (userId, errorType, details) => {
  await fetch('/api/errors/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, errorType, details, timestamp: new Date() })
  });
};

// Analyze errors
export const analyzeErrors = async (userId) => {
  const response = await fetch(`/api/errors/analyze/${userId}`);
  const data = await response.json();
  
  return {
    commonMistakes: data.commonMistakes,
    weakAreas: data.weakAreas,
    strongAreas: data.strongAreas,
    improvementRate: data.improvementRate,
    recommendations: data.recommendations
  };
};
```

---

## 🚀 Quick Start Guide

### Step 1: Environment Variables Setup

`.env` file बनाएं `frontend/` folder में:

```env
# OpenAI (for Chat, Games, Predictions)
VITE_OPENAI_API_KEY=sk-your-key-here

# Google Translate (for Translation)
VITE_GOOGLE_TRANSLATE_KEY=your-google-key

# AssemblyAI (for Pronunciation)
VITE_ASSEMBLYAI_API_KEY=your-assemblyai-key

# Your Backend API
VITE_API_BASE_URL=https://api.bolsaathi.com/api
```

### Step 2: Install Packages

```bash
cd frontend
npm install openai @google-cloud/translate
```

### Step 3: Update aiService.js

Real API calls के साथ mock functions replace करें (ऊपर examples देखें)

### Step 4: Test

```javascript
// Test each feature
const testFeatures = async () => {
  // Test AI Chat
  const chatResponse = await generateAIResponse("Hello", "friendly");
  console.log("Chat:", chatResponse);
  
  // Test Translation
  const translation = await translateText("Hello", "en", "hi");
  console.log("Translation:", translation);
  
  // Test Writing
  const writing = await analyzeWriting("I am learning Hindi", "en");
  console.log("Writing:", writing);
};
```

---

## 💰 Cost Estimation

### Free Options:
- **LanguageTool**: Completely FREE
- **Google Translate**: 500K chars/month FREE
- **AssemblyAI**: 5 hours/month FREE

### Paid Options:
- **OpenAI GPT-3.5**: ~$0.002 per 1K tokens (very cheap)
- **OpenAI GPT-4**: ~$0.03 per 1K tokens
- **Google Translate**: $20 per 1M chars after free tier

### Monthly Estimate (1000 users):
- AI Chat: ~$50-100
- Translation: FREE (within limit)
- Writing: FREE
- Pronunciation: FREE (within limit)
- Games: ~$20-30
- **Total: ~$70-130/month**

---

## 🔒 Security Best Practices

1. **API Keys को frontend में expose न करें**
   - Backend proxy बनाएं
   - Sensitive APIs backend से call करें

2. **Rate Limiting**
   ```javascript
   // Prevent abuse
   const rateLimiter = {
     requests: 0,
     resetTime: Date.now() + 60000 // 1 minute
   };
   ```

3. **Input Validation**
   ```javascript
   if (text.length > 1000) {
     throw new Error("Text too long");
   }
   ```

4. **Error Handling**
   ```javascript
   try {
     return await aiFunction();
   } catch (error) {
     // Log error
     // Return fallback
     return getMockData();
   }
   ```

---

## 📝 Implementation Priority

### Phase 1 (Easy & Free):
1. ✅ LanguageTool (Writing) - FREE
2. ✅ Google Translate - FREE tier
3. ✅ Mock responses (already done)

### Phase 2 (Add Real AI):
1. OpenAI GPT-3.5 (Chat, Games) - Cheap
2. AssemblyAI (Pronunciation) - FREE tier

### Phase 3 (Advanced):
1. GPT-4 for better responses
2. Custom ML models
3. Advanced analytics

---

## 🎯 Recommended Setup for BolSaathi

**Best Balance (Cost + Quality):**

1. **AI Chat**: OpenAI GPT-3.5-turbo ($0.002/1K tokens)
2. **Translation**: Google Translate (FREE tier)
3. **Writing**: LanguageTool (FREE)
4. **Pronunciation**: AssemblyAI (FREE tier)
5. **Games**: GPT-3.5-turbo (cheap)
6. **Predictions**: Simple calculations + GPT-3.5

**Total Cost: ~$50-100/month for 1000 active users**

---

## ✅ Next Steps

1. **Choose providers** (recommended: OpenAI + Google + LanguageTool)
2. **Get API keys**
3. **Update `.env` file**
4. **Modify `aiService.js`** with real implementations
5. **Test each feature**
6. **Deploy**

क्या आप चाहते हैं कि मैं किसी specific feature को real API के साथ implement कर दूं?

