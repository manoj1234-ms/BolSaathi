# BolSaathi - AI-Powered Indian Language Learning Platform

A modern, responsive web application for learning Indian languages with AI-powered pronunciation feedback and interactive lessons.

## 🚀 Features

- **18+ Indian Languages** - Learn Hindi, Bengali, Tamil, Telugu, Marathi, and more
- **AI-Powered Learning** - Real-time pronunciation feedback and conversation practice
- **Local Authentication** - Works entirely in the frontend with localStorage (no backend required for development)
- **Modern UI/UX** - Beautiful, responsive design with dark mode support
- **Protected Routes** - Secure authentication and route protection
- **Theme Support** - Light and dark mode with smooth transitions

## 🛠️ Tech Stack

- **React 19** - Latest React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library
- **Vanta.js** - Animated background effects

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### Local Development Mode (Default)

The app runs in **local storage mode** by default, which means:
- No backend server required
- User authentication uses browser localStorage
- All data persists in the browser
- Perfect for frontend development and testing

### API Mode

To use with a backend API, create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_USE_API_MODE=true
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Common components (Button, etc.)
│   ├── context/          # React Context providers
│   ├── middleware/       # Route protection
│   ├── pages/            # Page components
│   ├── Routes/           # Route configuration
│   ├── services/         # API services and local auth
│   └── utils/            # Utility functions and constants
├── public/               # Static assets
└── package.json
```

## 🔐 Authentication

The app supports two authentication modes:

1. **Local Storage Mode** (Default)
   - Users stored in browser localStorage
   - No backend required
   - Perfect for development

2. **API Mode**
   - JWT-based authentication
   - Backend API integration
   - Production-ready

## 🎨 Features Overview

### Pages
- **Home** - Landing page with hero, features, and languages
- **Features** - Detailed feature showcase
- **Languages** - Browse all supported languages
- **About** - Platform information
- **Contact** - Contact form and information
- **Login/Signup** - Authentication pages

### Components
- **Navbar** - Responsive navigation with theme toggle
- **Hero** - Eye-catching hero section
- **FeaturesSection** - Feature highlights
- **SupportedLanguages** - Language grid
- **ContactSection** - Contact form
- **Footer** - Site footer with links
- **ErrorBoundary** - Error handling
- **BackgroundWrapper** - Animated background

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open `http://localhost:5173` in your browser

## 📝 API Integration

See [API_INTEGRATION.md](./API_INTEGRATION.md) for detailed API documentation.

## 🎯 Development Tips

- The app uses **local storage mode** by default - no backend needed!
- All user data is stored in browser localStorage
- Check browser console for API configuration status
- Use React DevTools for debugging

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.
