import postinganModel from '../models/Postingan';
import { Request, Response } from "express";
import authModel from '../models/Auth';

const createPostingan = async (req: Request, res: Response) => 
{
    const authInfo = await authModel.getAuthInfo(req.headers.cookie.substring(10));
    req.body.userid = authInfo.userid;
    req.body.username = authInfo.username
    req.body.created_at = new Date();
    await postinganModel.createPostingan(req.body);
    res.status(201).json({
        message: `Berhasil membuat post untuk userid = ${req.body.userid}`,
        newPostingan: req.body,
    })
}

const getPostingan = async (req: Request, res: Response) =>
{
    try
    {
        const userIdParam = Number(req.params.userid)
        const postId = Number(req.params.id)
        const userIdSignedIn = (await authModel.getAuthInfo(req.headers.cookie?.substring(10)))?.userid || null;
        const postingan = await postinganModel.getPostingan(postId);
        if (postingan)
            res.json({
                post: postingan,
                authorized: (userIdSignedIn === userIdParam),
            })
        else
            res.status(404).json({
                message: "Not Found!"
            })
    }
    catch (error)
    {
        res.json({
            message: error.message,
        })
    }
}

const getUserPostingan = async (req: Request, res: Response) => 
{
    try
    {
        const userid = Number(req.params.userid);
        const postingans = await postinganModel.getUserPostingan(userid);
        res.json({
            posts: postingans,
        })
    }
    catch (error)
    {
        res.status(500).json({
            message: "Internal server error."
        })
    }
}

const getAllPostingan = async (req: Request, res: Response) =>
{
    const postingans = await postinganModel.getAllPostingan();
    res.json({
        posts: postingans,
    })
}

const updatePostingan = async (req: Request, res: Response) => 
{
    const userid = (await authModel.getAuthInfo(req.headers.cookie)).userid;
    await postinganModel.updatePostingan(Number(req.params.id), userid, req.body, res);
    res.json({
        message: "Berhasil mengupdate postingan.",
    })
}

const deletePostingan = async (req: Request, res: Response) =>
{
    const userid = await authModel.getAuthInfo(req.headers.cookie);
    if (await postinganModel.deletePostingan(Number(req.params.id), userid, res))
        res.json({
            message: "Berhasil menghapus postingan."
        })
}

export default {
    createPostingan,
    getPostingan,
    getUserPostingan,
    getAllPostingan,
    updatePostingan,
    deletePostingan,
}