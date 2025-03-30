import { Request, Response } from "express"
import authModel from "../models/Auth"
import userModel from "../models/User"
import {v4 as uuidv4} from 'uuid';
import jwt from "jsonwebtoken";

const generateToken = (userid: number, username: string) =>
{
    return jwt.sign({"userid": userid, "username": username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "24h",
    })
}

const login = async (req: Request, res: Response) => 
{
    const username: string = req.body.username;
    const password: string = req.body.pwd;
    const user = await userModel.getUserByUsername(username);
    if (!user)
        res.json({
            message: "User tidak ditemukan!",
            success: false,
        })
    else if (user.pwd === password)
    {
        let sessionID = req.headers.cookie?.substring(10) || null;
        if (!sessionID)
        {
            sessionID = (await authModel.getSessionIdByUsername(username))?.sessionid;
            if (!sessionID)
            {
                sessionID = uuidv4();
                await authModel.login(user, sessionID);
            }
            const status = (process.env.DB_HOST === "localhost") 
            console.log(status, !status)
            res.cookie("sessionid", sessionID, {
                path: "/",
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: !status,           
                secure: !status,
                sameSite: status ? "lax" : "none",
                partitioned: !status,
            })
        }
        res.json({
            message: "login success",
            success: true,
            user: user,
        });
    }
    else
        res.json({
            message: "Username atau Password salah",
            success: false,
        });
}

const getAuthInfo = async (req: Request, res: Response) =>
{
    const sessionid = req.headers.cookie?.substring(10);
    console.log(sessionid)
    if (sessionid)
    { 
        const authInfo = await authModel.getAuthInfo(sessionid);
        const response = {
            authInfo: authInfo,
        }
        console.log(response.authInfo)
        res.json(response)
    }
    else
    {
        res.status(401).json({
            authInfo: false,
            message: "Unauthorized, please sign in first."
        })
    }
}

export default {
    login,
    getAuthInfo,
}
