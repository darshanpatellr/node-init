const {MongoClient} = require('mongodb');

// 👇 Your connection string here
const url = "mongodb+srv://darshanpatellr_db_user:Wg7wmq75V8Uzk2m6@easydb.imk4pnz.mongodb.net/mydb";

const client = new MongoClient(url);

async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB Atlas");

    } catch (error) {
        console.error(error);
    }
}

connectDB();