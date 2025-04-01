import likeModels from "../models/Like";
import { Request, Response } from "express";
import authModel from "../models/Auth";
import likeModel from "../models/Like";
import Like from "@Types/Like";

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

const deleteLike = () =>
{

}

export default {
    getLikeCount,
    addLike,
    deleteLike,
}