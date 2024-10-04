import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import { sendResponse } from '../utils/sendResponse.js';

const SECRET_KEY = "NOTESAPI";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password){
    sendResponse(res, false, "Please Fill all credentials", 400);
    return;
  }
  
  try{
    let user = await User.findOne({email});
    if(user){
      sendResponse(res, false, "User Already Registered!", 409);
      return ;
    }

    user = new User({
      name,
      email,
      password,
    })

    await user.save();

    const token = jwt.sign({userId: user._id}, SECRET_KEY, {expiresIn: '1h'});
    sendResponse(res, true, "Registration Successfull", 201, {user:{id:user._id, name:user.name, email:user.email}}, token)
  }catch (err) {
    console.log(err);
    sendResponse(res, false, "Registration Failed, server Error", 500);
  }
}

export const signin = async(req, res) => {
  const { email, password } = req.body;
  if( !email || !password){
    sendResponse(res, false, "Please Fill all credentials", 400);
    return;
  }

  try{
    const user = await User.findOne({ email });
    if(!user){
      sendResponse(res, false, "Invalid Email Address" , 404);
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      sendResponse(res, false, "Invalid Password", 401);
      return;
    }
    const token = jwt.sign({userId: user._id}, SECRET_KEY, {expiresIn: '1h'});
    sendResponse(res, true, "Login Successful", 200, { user: { id: user._id, name: user.name, email: user.email, isPremium: user.isPremium } }, token);

  }
  catch (err) {
    console.log(err);
    sendResponse(res, false, " Login Failed, Internal Server Error ", 500)
  }


}