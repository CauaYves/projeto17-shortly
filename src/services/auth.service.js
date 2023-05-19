import db from "../database/database.connection.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function checkIfUserExists(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1;", [email]);
    return result.rowCount !== 0;
}
export async function createUser(name, email, password) {
    const query = `INSERT INTO users (name, email, password, createdat) VALUES ($1, $2, $3, to_timestamp($4));`;
    const timestamp = new Date().getTime();
    const hashedPassword = await bcrypt.hash(password, 5)
    const values = [name, email, hashedPassword, timestamp]
    return await db.query(query, values)
}
export async function searchAllUsers() {
    return await db.query("SELECT * FROM users")
}
export async function searchUserByEmail(email) {
    const user = await db.query("SELECT * FROM users WHERE email = $1;", [email])
    return user.rows[0]
}
export async function createToken(userid, username) {
    const token = jwt.sign(userid, username)
    return token
}
export async function checkToken(req) {
    const auth = req.headers.authorization
    const token = auth.replace("Bearer", "")
    jwt.verify(token,)
}
export async function receiveCookie(req) {
    const cookieName = 'cookieName';

    if (req.headers.cookie) {
        const cookies = req.headers.cookie.split(';');
        const cookieValue = cookies.find(cookie => cookie.trim().startsWith(`${cookieName}=`));

        if (cookieValue) {
            const serializedCookie = cookieValue.split('=')[1];
            const decodedCookie = decodeURIComponent(serializedCookie);
            const parsedCookie = JSON.parse(decodedCookie);

            return parsedCookie;
        }
    }

    return null;
}