import jwt from 'jsonwebtoken';
import { User } from '../Models/User.js';




export const isAuthenticated = async(req,res,next)=>{

const token = req.header('Auth');

if(!token) return res.json({message:'login first'})

    const decoded = jwt.verify(token,process.env.JWT)

    const id = decoded.userId

    let user = await User.findById(id)

    if(!user) return res.json({message:'not found',success:false})
// node help to create a global user here that you can save in req.anything you can access it after authentication


req.user = user;    
  
next();
    
}