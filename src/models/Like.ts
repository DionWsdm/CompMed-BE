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
    await db("posts").where("id", postid).decrement("likes", 1);
}

const getLikeByUserAndPostId = async (userid: number, postid: number) =>
{
    const [like] = await db("likes").where("userid", userid).where("postid", postid).select();
    return like
}

const getUserLikedPost = async (userid: number) =>
{
    const postids = await db("likes").where("userid", userid).select("postid");
    return postids;
}

export default {
    getUserLikedPost,
    getLikeCount,
    getLikeByUserAndPostId,
    addLike,
    deleteLike,
}