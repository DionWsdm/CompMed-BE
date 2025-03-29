import express from 'express';
import { Request, Response } from 'express';
import userModel from '../models/User';
import User from '../data/User';

const createUser = async (req: Request, res: Response) =>
{
    const user: User = req.body as User
    await userModel.createUser(user);
    res.json({
        message: "Berhasil membuat user",
    })
}

const getUser = async (req: Request, res: Response) => 
{
    const userId = Number(req.params.userId);
    const user = await userModel.getUser(userId);
    res.status(201).json({
        user: user,
    })
}

const getAllUser = (req: Request, res: Response) =>
{
    const user = await userModel.getAllUser();
    res.json({
        users: user
    })
}

export default {
    createUser,
    getUser,
    getAllUser,
}