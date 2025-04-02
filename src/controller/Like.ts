import likeModels from "../models/Like";
import { Request, Response } from "express";
import authModel from "../models/Auth";
import likeModel from "../models/Like";
import Like from "@Types/Like";

const getUserLikedPost = async (req: Request, res: Response) =>
{
    const authInfo = await authModel.getAuthInfo(req.headers.cookie.substring(10));
    const userid = authInfo.userid;
    const like = await likeModel.getUserLikedPost(userid);
    const postids = like.map((data) => data.postid);
    res.json({
        likedPosts: postids,
    })
}

const getLikeByUserAndPostId = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
    const userid = Number(req.params.userid);
    const postid = Number(req.params.postid);
    console.log(userid, postid)
    const like = await likeModel.getLikeByUserAndPostId(userid, postid);
    if (like)
        res.json({
            message: "Like ditemukan!"
        });
    else
        res.status(404).send();
    }
    catch (error)
    {
        console.log("Terjadi error: ", error);
    }
}

const getLikeCount = async (req: Request, res: Response): Promise<void> => 
{
    const likeCount = await likeModels.getLikeCount(Number(req.params.postid));
    res.send({
        likeCount: likeCount
    })
}

const addLike = async (req: Request, res: Response) =>
{
    const authInfo = await authModel.getAuthInfo(req.headers.cookie.substring(10));
    const postid = req.params.postid;
    const like: Like = {userid: authInfo.userid, postid: Number(postid)};

    if (await likeModel.addLike(like))
        res.status(201).send();
    else
        res.status(401).send();
}

const deleteLike = async (req: Request, res: Response) =>
{
    try
    {
        const authInfo = await authModel.getAuthInfo(req.headers.cookie.substring(10));
        const postid = Number(req.params.postid);
        await likeModel.deleteLike(authInfo.userid, postid);
        res.status(204).send()
    }
    catch (error)
    {
        console.log("Terjadi Error: ", error);
    }
}

export default {
    getUserLikedPost,
    getLikeCount,
    getLikeByUserAndPostId,
    addLike,
    deleteLike,
}