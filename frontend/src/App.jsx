import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import RouteConfig from "./Routes/RouteConfig.jsx";
import BackgroundWrapper from "./components/BackgroundWrapper";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <BackgroundWrapper>
            <AuthProvider>
              <RouteConfig />
            </AuthProvider>
          </BackgroundWrapper>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
