// controllers/Verify.js
import user from '../Schema/User.js';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const isEmail = (input) => /^\S+@\S+\.\S+$/.test(input);
export const singup = async (req, res) => {
  const { name, password, confirmpassword, email, age, username, mobile } = req.body;

  try {
    // Field validation
    if (!name || !password || !confirmpassword || !email || !age || !username || !mobile) {
      console.log(req.body);
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, gmail, password, confirmpassword, age, username, mobile',
      });
    }

    // Password match check
    if (password !== confirmpassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match.',
      });
    }

    // Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `A user is already registered with the email: ${email}`,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
      age,
      username,
      mobile
    });

    return res.status(201).json({
      success: true,
      message: 'User has been registered successfully.',
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during signup.',
    });
  }
};
export const login = async (req, res) => {
  try {
    const { password, gmail } = req.body;

    if (!gmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in both email and password.",
      });
    }

    const User = await user.findOne({ email: gmail });

    if (!User) {
      return res.status(401).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    const isMatch = await bcrypt.compare(password, User.password);

    if (isMatch) {
      const token = jwt.sign(
        { username: User.username, id: User._id },
        "12345", // Replace with real secret
        { expiresIn: "24h" }
      );

      User.token = token;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      };

      console.log("token", token);

      return res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User login successfully",
        token,
        user: { id: User._id, name: User.name, email: User.email },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong with the login process.",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { gmail, oldpassword, newpassword } = req.body;

    const User = await user.findOne({email: gmail }); // ✅ Await needed

    if (!User) {
      console.log(User);
      return res.status(404).json({
        success: false,
        message: "User not found with this Gmail address."
      });
    }

    const isMatch = await bcrypt.compare(oldpassword, User.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect."
      });
    }

    const newHashedPassword = await bcrypt.hash(newpassword, 10);
    await user.findOneAndUpdate(
      { gmail },
      { password: newHashedPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Your password has been changed successfully."
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "There was a technical error. Please try again later."
    });
  }
};
  