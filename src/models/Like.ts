import db from "../data/db"
import postinganModel from "./Postingan"
import Like from "@Types/Like";

const getLikeCount = async (postid: number): Promise<number> =>
{
    const likes = await db("likes").where("postid", postid).select();
    return likes.length
}

const addLike = async (like: Like) =>
{
    const postingan = await postinganModel.getPostingan(like.postid);
    if (!postingan)
        return false;
    await db("posts").where("id", like.postid).increment("likes", 1)
    await db("likes").insert(like);
    return true;
}

const deleteLike = async (userid: number, postid: number) =>
{
    await db("likes").where("userid", userid).where("postid", postid).delete();
}

export default {
    getLikeCount,
    addLike,
    deleteLike,
}