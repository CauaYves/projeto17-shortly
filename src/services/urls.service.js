import { nanoid } from "nanoid"
import db from "../database/database.connection.js"

export async function checkToken(req) {
    const { authorization } = req.headers
    if (authorization === undefined) return null
}

export async function getNanoidById(nanoid) {
    const urls = await db.query("SELECT id, shorturl FROM urls WHERE shorturl = $1;", [nanoid]);
    if(urls.rowCount === 0) return null
    return urls.rows[0]
}

export async function getUrlDataById(id) {
    const answer = await db.query("SELECT id, shorturl, url FROM urls WHERE id = $1;", [id]);
    if(answer.rowCount === 0) return null
    return answer.rows[0]
}