import { User } from "../models/User.js";

export const updateMe = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, email, phone } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (phone) updates.phone = phone;

    // For simplicity, allow email change without re-verification.
    if (email) {
      updates.email = email.toLowerCase();
    }

    const updated = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-passwordHash");

    return res.json({
      success: true,
      user: {
        id: updated._id,
        email: updated.email,
        name: updated.name,
        phone: updated.phone,
        verifiedAt: updated.verifiedAt,
      },
    });
  } catch (err) {
    next(err);
  }
};


