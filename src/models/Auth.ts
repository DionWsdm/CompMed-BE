import db from '../data/db';
import User from '@Types/User';

const login = async (user: User, sessionid: string) =>
{
    await db("auth").insert({
        sessionid: sessionid,
        userid: user.id,
        username: user.username,
    })
}

const getAuthInfo = async (sessionid: string) =>
{
    const [authInfo] = await db("auth").where("sessionid", sessionid).select();
    return authInfo;
}

const getSessionIdByUsername = async (username: string) =>
{
    const [data] = await db("auth").where("username", username).select("sessionid");
    return data;
}

export default {
    login,
    getAuthInfo,
    getSessionIdByUsername,
}