import db from '../data/db';
import Post from '../data/Postingan';
import { Response } from 'express';

const createPostingan = async (postingan: Post) =>
{
    await db("posts").insert(postingan);
}

const getPostingan = async (postId: number) =>
{
    const [postingan] = await db("posts").where("id", postId).select()
    return postingan;
}

const getUserPostingan = async (userid: Number) => 
{
    const postingans = await db("posts").select("*").where("userid", userid)
    return postingans
}

const getAllPostingan = async () =>
{
    const postingans = await db("posts").select("*");
    return postingans.reverse();
}

const updatePostingan = async (id: Number, userid: Number, changes: Record<string, string>, res: Response) =>
{
    const [postingan] = await db("posts").where("id", id).select();
    if (!postingan)
        res.status(404).json({
            message: "Postingan tidak ditemukan."
        });
    else if (postingan.userid != userid)
        res.status(403).json({
            message: "Anda tidak memiliki izin untuk mengubah post ini!"
        });
    await db("posts").where("id", id).update(changes)
}

const deletePostingan = async (id: Number, userid: Number, res: Response) =>
{
    const [postingan] = await db("posts").where("id", id).select();
    if (!postingan)
        res.status(404).json({
            message: "Postingan tidak ditemukan."
        });
    else if (postingan.userid != userid)
        res.status(403).json({
            message: "Anda tidak memiliki izin untuk menghapus post ini!"
        });
    else
    {
        await db("posts").delete("*").where("id", id);
        return true
    }
    return false
}

export default {
    createPostingan,
    getUserPostingan,
    getPostingan,
    getAllPostingan,
    updatePostingan,
    deletePostingan,
}