import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { OtpToken } from "../models/OtpToken.js";
import { generateOtp } from "../utils/generateOtp.js";

const OTP_EXPIRY_MINUTES = 5;

const createJwtForUser = (user) => {
  const secret = process.env.JWT_SECRET || "supersecretchangeme";
  return jwt.sign(
    { userId: user._id, email: user.email },
    secret,
    { expiresIn: "7d" }
  );
};

const createAndStoreOtp = async (email, type) => {
  const code = generateOtp();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await OtpToken.deleteMany({ email, type });
  await OtpToken.create({
    email,
    code,
    type,
    expiresAt,
  });

  // TODO: integrate real email service.
  console.log(`${type} OTP for ${email}: ${code}`);
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing && existing.isEmailVerified) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let user;
    if (existing) {
      existing.name = name;
      existing.phone = phone;
      existing.passwordHash = passwordHash;
      existing.isEmailVerified = false;
      existing.verifiedAt = null;
      user = await existing.save();
    } else {
      user = await User.create({
        name,
        email: email.toLowerCase(),
        phone,
        passwordHash,
      });
    }

    await createAndStoreOtp(user.email, "signup");

    return res.json({
      success: true,
      message: "OTP sent to your email (development: check server logs).",
    });
  } catch (err) {
    next(err);
  }
};

export const resendSignupOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found. Please signup first." });
    }

    await createAndStoreOtp(user.email, "signup");

    return res.json({
      success: true,
      message: "Signup OTP resent (development: check server logs).",
    });
  } catch (err) {
    next(err);
  }
};

export const verifySignupOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const token = await OtpToken.findOne({
      email: email.toLowerCase(),
      code: otp,
      type: "signup",
      expiresAt: { $gt: new Date() },
    });

    if (!token) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.isEmailVerified = true;
    user.verifiedAt = new Date();
    await user.save();

    await OtpToken.deleteMany({ email: email.toLowerCase(), type: "signup" });

    return res.json({
      success: true,
      message: "Email verified successfully. You can now login.",
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please signup first.",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email not verified. Please complete signup.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    await createAndStoreOtp(user.email, "login");

    return res.json({
      success: true,
      needsOTP: true,
      message: "OTP sent for login verification (development: check server logs).",
    });
  } catch (err) {
    next(err);
  }
};

export const resendLoginOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    await createAndStoreOtp(user.email, "login");

    return res.json({
      success: true,
      message: "Login OTP resent (development: check server logs).",
    });
  } catch (err) {
    next(err);
  }
};

export const verifyLoginOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const token = await OtpToken.findOne({
      email: email.toLowerCase(),
      code: otp,
      type: "login",
      expiresAt: { $gt: new Date() },
    });

    if (!token) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await OtpToken.deleteMany({ email: email.toLowerCase(), type: "login" });

    const jwtToken = createJwtForUser(user);

    return res.json({
      success: true,
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        verifiedAt: user.verifiedAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    // JWT is stateless; client should just delete the token.
    return res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    return res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        verifiedAt: user.verifiedAt,
      },
    });
  } catch (err) {
    next(err);
  }
};


