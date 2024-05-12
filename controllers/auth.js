const authRouter = require('express').Router()
const user = require('../models/User')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

authRouter.post('/register', async (req, res) =>{
    try{
        const isExisting = await user.findOne({email:req.body.email})
        if(isExisting){
            throw new Error("Account already exist with this email. Try another email")
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const newUser = await user.create({...req.body, password: hashedPassword})

        const {password, ...others} = newUser._doc
        const token = jwt.JsonWebTokenError({id: newUser.id}, process.env.JWT_SECRET, {expireIn: "1h"})
        return res.status(201).json({others: user, token})
    }catch (error){
        res.status(500).json(error.message)

    }
})

authRouter.post('/register', async (req, res) =>{
    try{
        const user = await user.findOne({email:req.body.email})
        if(!user){
            throw new Error("invalid credentials")
        }
        const comparePass = await bcrypt.compare(req.body.password, user.password)
        if(!comparePass){
            throw new Error("invalid credentials")
        }

        const {password, ...others} = user._doc
        const token = jwt.JsonWebTokenError({id: user.id}, process.env.JWT_SECRET, {expireIn: "1h"})
        return res.status(201).json({others: user, token})
    }catch (error){
        res.status(500).json(error.message)

    }
    
})

module.exports = authRouter