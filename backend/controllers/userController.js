import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ---------- SIGNUP ----------
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "Email already registered" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "free",
      subscriptionExpiresAt: null,
    });

    res.json({ message: "Signup Successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------- LOGIN ----------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Match password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Wrong password" });

    // JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const buySubscription = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         role: "premium",
//         subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//       },
//       { new: true }
//     );

//     res.json({
//       message: "Subscription Purchased Successfully",
//       user: updatedUser,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const buySubscription = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.role = "premium";
  await user.save();

  // ✅ NEW TOKEN with updated role
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.json({
    message: "Premium activated",
    token,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
    },
  });
};
