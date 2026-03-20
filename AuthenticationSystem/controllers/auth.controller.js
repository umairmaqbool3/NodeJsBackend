import userModel from "../models/user.model.js";
import crypto from "crypto";

async function register(req,res){
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
}