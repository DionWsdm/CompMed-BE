import db from '../data/db';
import User from '../@Types/User';

const createUser = async (user: User) => 
{
    await db("users").insert(user)
}

const getUser = async (userId: number) => 
{
    const [user] = await db("users").select("*").where("id", userId);
    return user;
}

const getUserByUsername = async (username: string) =>
{
    const [user] = await db("users").where("username", username).select();
    return user;
}

const getAllUser = async () =>
{
    const users = await db("users").select();
    return users;
}

const updateUser = async () =>
{

}

const deleteUser = async () => 
{

}

export default {
    createUser,
    getUser,
    getAllUser,
    getUserByUsername,
    updateUser,
    deleteUser,
}