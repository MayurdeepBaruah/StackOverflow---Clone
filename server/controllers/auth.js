import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import users from "../models/auth.js"

export const signup = async(req,res)=> {
    const { name, email, password }=req.body; // request sent by the user
    try {
        const existinguser = await users.findOne({ email }) // searching if the user is existing in the database
        if(existinguser){
            return res.status(404).json({message: "User already exist"}) // responding to the user that user exist

        }
        const hashedPassword = await bcrypt.hash(password, 12) // storing password in the database through hash
        const newUser = await users.create({ name, email, password: hashedPassword}) // creating new entry in the database for new user
        const token = jwt.sign({ email: newUser.email, id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"}) // giving token to the user 
        res.status(200).json({ result: newUser, token }) // responding to the user with new signup details
    } catch (error) {
        res.status(500).json("Something went wrong...") //error message 
    }
}
export const login = async(req,res)=> {
    const { email, password }=req.body; // request sent by the user
    try {
        const existinguser = await users.findOne({ email }) // searching if the user is existing in the database
        if(!existinguser){
            return res.status(404).json({message: "User don't exist"}) // responding to the user that user exist
        }
        const isPasswordCrt= await bcrypt.compare(password, existinguser.password) // comparing the password entered by the user to the password saved in the database
        if(!isPasswordCrt){
            return res.status(400).json({ message: "Invalid credentials" }) // if not matched responding to the user 
        }
        const token = jwt.sign({ email: existinguser.email, id: existinguser._id}, process.env.JWT_SECRET, {expiresIn: "1h"}) // if yes token is send to the user 
        res.status(200).json({ result: existinguser, token }) // responding to the user with login details
    } catch (error) {
        res.status(500).json("Something went wrong...") // error message
    }
}