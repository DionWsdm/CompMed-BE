import db from '../data/db';
import User from '../data/User';

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

const updateUser = async () =>
{

}

const deleteUser = async () => 
{

}

export default {
    createUser,
    getUser,
    getUserByUsername,
    updateUser,
    deleteUser,
}