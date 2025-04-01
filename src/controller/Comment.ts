import express from 'express'
import authModel from "../models/Auth";
import commentModel from "../models/Comment";

const createComment = async (req: express.Request, res: express.Response) =>
{
    const authInfo = await authModel.getAuthInfo(req.headers.cookie.substring(10));
    req.body.userid = authInfo.userid;
    req.body.username = authInfo.username;
    req.body.created_at = new Date();
    req.body.postid = req.params.postid;
    await commentModel.createComment(req.body);
    res.status(201).json({
        message: "Berhasil membuat komentar",
    })
}

const getCommentByPostId = async (req: express.Request, res: express.Response) => 
{ 
    const postid = Number(req.params.postid);
    const comments = await commentModel.getCommentByPostId(postid);
    res.json({
        comments: comments,
    })
}

const updateComment = (req: express.Request, res: express.Response) =>
{
    
}

const deleteComment = async (req: express.Request, res: express.Response) =>
{
    const authInfo = await authModel.getAuthInfo(req.headers.cookie.substring(10));
    const id = Number(req.params.id)
    if (await commentModel.deleteComment(id, authInfo.userid))
        res.json({
            message: "Berhasil menghapus komentar",
        })
    else
        res.status(403).json({
            message: "Unauthorized"
        })
}

export default {
    createComment,
    getCommentByPostId,
    updateComment,
    deleteComment,
}
