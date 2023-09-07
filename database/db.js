// @ts-ignore

const { Level } = require('level')

// Create a database
const db = new Level('./db', { valueEncoding: 'json' })


db.on('ready',async () => {await db.put('muser1','mpassword1');});
db.on('ready',async () => {await db.put('muser2','mpassword2');});
db.on('ready',async () => {await db.put('muser3', 'blocked');});

console.log("db working");
// @ts-ignore
export const likePhoto = async (username,photoId) => {
    await db.put(`${username}_${photoId}`, 'true');
};

// @ts-ignore
export const unlikePhoto = async (username,photoId) => {
    await db.del(`${username}_${photoId}`);
};

// @ts-ignore
export const isPhotoLiked = async (username,photoId) => {
    try {
        await db.get(`${username}_${photoId}`);
        return true;
    } catch {
        return false;
    }
};

export default db;
