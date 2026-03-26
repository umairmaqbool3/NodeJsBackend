import userModel from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sessionModel from "../models/session.model.js";

export async function register(req,res){
    const {username, email, password} = req.body;
    const isAlreadyRegistered = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isAlreadyRegistered){
        res.status(409).json({
            message: "Username or email already exist"
        })
    }

    const hasdedPassword = crypto.createHash("sha256").update(password).digest("hex");
    const user = await userModel.create({
        username,
        email,
        password: hasdedPassword
    })

    const refreshToken = jwt.sign({
        id:user._id
    },config.JWT_SECRET,{
        expiresIn:"7d"
    })

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })

    const accessToken = jwt.sign({
        id: user._id,
        sessionId: session._id
    },config.JWT_SECRET,{
        expiresIn: "1d"
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
        message:"User registered Successfully",
        user:{
            username: user.username,
            email: user.email
        },
        token:accessToken,
    })
}

export async function getMe(req,res){
    const token = req.headers.authorization?.split(" ")[1];
    console.log("req : ", req.headers.authorization)
    console.log("token : ", token)

    if(!token){
        return res.status(401).json({
            message:"Token not found"
        })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user =await userModel.findById(decoded.id);

    res.status(200).json({
        message:"User fetched successfully",
        user:{
            username: user.username,
            email: user.email
        }
    })

}

export async function refreshToken(req,res){
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            message: "Refresh Token not found"
        })
    }

    const decoded = jwt.verify(refreshToken,config.JWT_SECRET);

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })

    if(!session){
        return res.status(401).json({
            message:"Invalid refresh token"
        })
    }

    const accessToken = jwt.sign({
        id: decoded.id
    },config.JWT_SECRET,{
        expiresIn:"15m"
    })

    const newRefreshToken = jwt.sign({
        id:decoded.id
    },config.JWT_SECRET,{
        expiresIn:"7d"
    })

    const newRefreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    session.refreshTokenHash = newRefreshTokenHash;
    await session.save();

    res.cookie("refreshToken",newRefreshToken,{
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        message:"Access Token refreshed successfully",
        accessToken,
        refreshToken:newRefreshToken
    })
}

export async function logout(req,res){
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        res.status(400).json({
            message: "Refresh Token not found"
        })
    }

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })

    if(!session){
        res.status(400).json({
            message: "Invalid refresh token"
        })
    }

    session.revoked = true;
    await session.save();

    res.clearCookie("refreshToken");

    res.status(200).json({
        message: "Logged out successfully"
    })

}