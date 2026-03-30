const { MongoClient } = require('mongodb');

// 👇 Your connection string here
const url = "mongodb+srv://darshanpatellr_db_user:Wg7wmq75V8Uzk2m6@easydb.imk4pnz.mongodb.net/mydb";

const client = new MongoClient(url);

async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB Atlas");

        const db = client.db("mydb");

        const result = await db.collection("test").insertOne({
            name: "Darshan",
            role: "Developer"
        });

        console.log("Inserted ID:", result.insertedId);

    } catch (error) {
        console.error(error);
    }
}

connectDB();