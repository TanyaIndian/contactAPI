import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  //    console.log(req.body,'body')
  if (name == "" || email == "" || password == "")
    return res.json({ message: "alla fields are required" });

  let user = await User.findOne({ email });

  if (user)
    return res.json({ message: "UserAlerady registered", success: false });

  const hashPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashPassword });

  res.json({ message: user, success: true });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email == "" || password == "")
    return res.json({ message: "alla fields are required" });
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not exist", success: false });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.json({ message: "invalid password" });

const token = jwt.sign({userId : user._id},process.env.JWT,{expiresIn:'1d'})


  res.json({ message: `welacome ${user.name}`,token, sucees: true });
};
