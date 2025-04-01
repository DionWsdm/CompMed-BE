import db from '../data/db'
import express from 'express'
import Comment from '@Types/Comment';

const createComment = async (comment: Comment) =>
{
    await db("comments").insert(comment);
    await db("posts").where("id", comment.postid).increment("comments", 1);
}

const getComment = async (id: number) =>
{
    const [comment] = await db("comments").where("id", id).select()
    return comment;
}

const getCommentByPostId = async (postid: number) => 
{
    const comments = await db("comments").where("postid", postid).select();
    return comments
}

const updateComment = (req: express.Request, res: express.Response) =>
{
    
}

const deleteComment = async (id: number, userid: number) =>
{
    const comment = await getComment(id);
    if (comment.userid != userid || !comment)
        return false;
    await db("comments").where("id", id).delete();
    await db("posts").where("postid", comment.postid).decrement("comments", 1);
    return true;
}

export default {
    createComment,
    getComment,
    getCommentByPostId,
    updateComment,
    deleteComment,
}
