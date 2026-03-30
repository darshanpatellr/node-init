const {MongoClient} = require('mongodb');


const url = 'mongodb+srv://darshanpatellr_db_user:Wg7wmq75V8Uzk2m6@easydb.imk4pnz.mongodb.net/';

const client = new MongoClient(url);

async function connectDB() {
    try {
        await client.connect();
        console.log("✅  Connected to MongoDB Atlas");

        createCollectionInDB();
    } catch (err) {
        console.error('connectDB Error: ' + err);
    }
}

connectDB();

async function createCollectionInDB() {
    console.log('👉 Creating DB to MongoDB Atlas');
    try {
        const db = client.db('mydb');

        const data = {
            name: 'MongoDB',
            email: 'mongo@gmail.com',
            password: '123456',
        };

        const result = await db.collection("customers").insertOne(data);

        console.log("✅ Document inserted:", result.insertedId);
    } catch (err) {
        console.error('createDB Error: ' + err);
    }
}