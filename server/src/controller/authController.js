import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import { sendResponse } from '../utils/sendResponse.js';
import Blacklist from '../model/BlackListToken.js';

const SECRET_KEY = "NOTESAPI";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    sendResponse(res, false, "Please Fill all credentials", 400);
    return;
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      sendResponse(res, false, "User Already Registered!", 409);
      return;
    }

    user = new User({
      name,
      email,
      password,
    })

    await user.save();

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    sendResponse(res, true, "Registration Successfull", 201, { user: { id: user._id, name: user.name, email: user.email } }, token)
  } catch (err) {
    console.log(err);
    sendResponse(res, false, "Registration Failed, server Error", 500);
  }
}

export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    sendResponse(res, false, "Please Fill all credentials", 400);
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      sendResponse(res, false, "Invalid Email Address", 404);
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      sendResponse(res, false, "Invalid Password", 401);
      return;
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    sendResponse(res, true, "Login Successful", 200, { user: { id: user._id, name: user.name, email: user.email, isPremium: user.isPremium } }, token);

  }
  catch (err) {
    console.log(err);
    sendResponse(res, false, " Login Failed, Internal Server Error ", 500)
  }


}

export const logout = async (req, res) => {
  console.log("reaching logout")
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return sendResponse(res, false, "No token provided", 400)
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const expiresAt = new Date(decoded.exp * 1000);

    await Blacklist.create({ token, expiresAt });

    sendResponse(res, true, 'Logout successful', 200);
  } catch (error) {
    console.error(error);
    sendResponse(res, false, 'Invalid token or logout failed', 500);

  }
}

