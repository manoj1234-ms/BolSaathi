import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { verifyOTP, sendOTPEmail } from "../services/emailService";

const OTPVerification = ({ email, signupData, onBack }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [devOTP, setDevOTP] = useState(null); // Store OTP for dev mode display
  const navigate = useNavigate();
  const { completeSignup } = useContext(AuthContext);

  // Send OTP on component mount
  useEffect(() => {
    const sendInitialOTP = async () => {
      try {
        const result = await sendOTPEmail(email, 'signup');
        // If in dev/fallback mode, store OTP for display
        if (result.fallback && result.otp) {
          setDevOTP(result.otp);
        }
      } catch (err) {
        console.error("Error sending initial OTP:", err);
      }
    };
    sendInitialOTP();
  }, [email]);

  // Timer for OTP expiration
  useEffect(() => {
    if (timeLeft === 0) {
      setError("OTP expired. Please signup again.");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp.trim()) {
      setError("Please enter OTP");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    if (timeLeft === 0) {
      setError("OTP has expired");
      return;
    }

    setLoading(true);
    try {
      // Verify OTP
      const verification = verifyOTP(email, otp);
      
      if (!verification.valid) {
        setError(verification.error || "Invalid OTP");
        setLoading(false);
        return;
      }

      // OTP is valid, complete signup
      const result = await completeSignup(signupData);
      if (result.success) {
        navigate("/", {
          replace: true,
          state: {
            message: "Email verified! Account created successfully. Welcome to BolSaathi!",
          },
        });
      } else {
        setError(result.error || "Failed to complete signup");
      }
    } catch (err) {
      setError("An error occurred during OTP verification");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setOtp("");
    setResending(true);
    try {
      const result = await sendOTPEmail(email, 'signup');
      if (result.success) {
        setTimeLeft(300);
        setError(""); // Clear any previous errors
        // If in dev/fallback mode, store OTP for display
        if (result.fallback && result.otp) {
          setDevOTP(result.otp);
        } else {
          setDevOTP(null); // Clear dev OTP if real email was sent
        }
        // Show success message briefly
        if (result.fallback) {
          // Don't show alert in dev mode, OTP is already visible on screen
        } else {
          alert("OTP sent successfully to your email");
        }
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #D6F4ED 0%, #87BAC3 100%)",
      }}
    >
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2
          className="text-3xl font-bold mb-2 text-center"
          style={{ color: "#473472" }}
        >
          Verify Email
        </h2>
        <p className="text-center mb-6" style={{ color: "#53629E" }}>
          We've sent an OTP to <strong>{email}</strong>
        </p>

        {/* Development Mode - Show OTP on screen */}
        {devOTP && (
          <div className="mb-4 p-4 rounded-lg border-2 border-dashed" style={{ 
            backgroundColor: "#FFF3CD", 
            borderColor: "#FFC107",
            color: "#856404"
          }}>
            <p className="text-center font-bold text-lg mb-2">🔐 Development Mode</p>
            <p className="text-center text-sm mb-2">EmailJS not configured. Your OTP is:</p>
            <p className="text-center font-mono text-2xl font-bold" style={{ color: "#473472" }}>
              {devOTP}
            </p>
            <p className="text-center text-xs mt-2">
              To receive real emails, configure EmailJS (see EMAILJS_SETUP.md)
            </p>
          </div>
        )}

        {error && (
          <div
            className="border px-4 py-3 rounded-lg mb-4"
            style={{
              backgroundColor: "#FFE5E5",
              borderColor: "#FF6B6B",
              color: "#CC0000",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div>
            <label
              className="block font-semibold mb-2"
              style={{ color: "#473472" }}
            >
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="000000"
              maxLength="6"
              className="w-full px-4 py-3 text-center text-2xl border-2 rounded-lg focus:outline-none transition tracking-widest"
              style={{ borderColor: "#D6F4ED", color: "#473472" }}
              onFocus={(e) => (e.target.style.borderColor = "#87BAC3")}
              onBlur={(e) => (e.target.style.borderColor = "#D6F4ED")}
            />
          </div>

          <div className="text-center" style={{ color: "#53629E" }}>
            <p className="text-sm">
              OTP expires in:{" "}
              <strong style={{ color: timeLeft < 60 ? "#CC0000" : "#473472" }}>
                {formatTime(timeLeft)}
              </strong>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || timeLeft === 0}
            className="w-full text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50"
            style={{ backgroundColor: "#53629E" }}
            onMouseEnter={(e) =>
              !loading && (e.target.style.backgroundColor = "#473472")
            }
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#53629E")}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-6 space-y-2">
          <button
            onClick={handleResendOTP}
            disabled={loading || resending}
            className="w-full text-center font-semibold py-2 rounded-lg transition disabled:opacity-50"
            style={{
              color: "#53629E",
              backgroundColor: "transparent",
              border: "2px solid #53629E",
            }}
            onMouseEnter={(e) => !resending && (e.target.style.backgroundColor = "#D6F4ED")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            {resending ? "Sending..." : "Resend OTP"}
          </button>

          <button
            onClick={onBack}
            disabled={loading}
            className="w-full text-center font-semibold py-2 rounded-lg transition"
            style={{
              color: "#473472",
              backgroundColor: "transparent",
              border: "2px solid #473472",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#D6F4ED")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            Back to Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
