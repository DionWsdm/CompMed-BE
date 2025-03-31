import db from 'data/db'
import express from 'express'

const createComment = async (comment: Comment) =>
{
    await db("comments").insert(comment);
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
    return true;
}

export default {
    createComment,
    getComment,
    getCommentByPostId,
    updateComment,
    deleteComment,
}
