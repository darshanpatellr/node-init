const {MongoClient, ObjectId} = require('mongodb');
const express = require('express');
const bcrypt = require('bcrypt');

//  express work flow
const app = express();
const port = 3000;
app.use(express.json());

//  mongoDB work flow
const url = 'mongodb+srv://darshanpatellr_db_user:Wg7wmq75V8Uzk2m6@easydb.imk4pnz.mongodb.net/';
const client = new MongoClient(url);

async function startServer() {
    await connectToMongoDB();

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

startServer();

//  Mongo Connection Establish
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("✅  Connected to MongoDB Atlas");

    } catch (err) {
        console.error('connectToMongoDB Error: ' + err);
    }
}

// Insert data in MongoDB
async function insertInToMongoDB(data) {
    try {
        const db = client.db('mydb');

        const existingUser = await db.collection('users').findOne({email: data.email});

        if (existingUser) {
            console.log('User already exists!');
            return "existingUser";
        } else {
            const result = await db.collection('users').insertOne(data);
            return result.insertedId;
        }

    } catch (err) {
        console.error('insertInToMongoDB Error: ' + err);
    }
}

// Get All data in MongoDB
async function findAllInToMongoDB() {
    const db = client.db('mydb');
    const users = await db.collection('users').find({}).toArray();
    console.log('Users : ' + JSON.stringify(users));
    if (users == null) {
        return [];
    } else {
        return users;
    }
}

// Get User Details in MongoDB
async function findOneInToMongoDB(id) {
    const db = client.db('mydb');
    if (!ObjectId.isValid(id)) {
        return null;
    }
    const userDetails = await db.collection('users').findOne({
        _id: new ObjectId(id)
    });
    console.log('UserDetails : ' + JSON.stringify(userDetails));
    return userDetails;
}

// API Work Flow
app.post('/api/users', async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            statusCode: 400,
            message: "All fields are required"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
        name,
        email,
        password: hashedPassword
    };

    const insertedId = await insertInToMongoDB(userData);

    if (insertedId === null) {
        res.status(400).send({
            statusCode: 400,
            message: 'User failed to insert into MongoDB database'
        });
    } else if (insertedId === 'existingUser') {
        res.status(400).send({
            statusCode: 400,
            message: 'User already exists! - ' + email
        })
    } else {
        res.status(201).send({
            statusCode: 201,
            message: 'User successfully insert into MongoDB database',
            data: {
                name,
                email,
                userId: insertedId,
            }
        });
    }
});

app.get('/api/users', async (req, res) => {
    const users = await findAllInToMongoDB();
    if (users === null) {
        res.status(404).json({
            statusCode: 404,
            message: 'Users not found!',
        });
    } else {
        res.status(200).json({
            statusCode: 200,
            message: 'Users successfully found into MongoDB database',
            data: {
                users: users
            }
        })
    }
});

app.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;

    const user = await findOneInToMongoDB(id);
    if (user === null) {
        res.status(404).json({
            statusCode: 404,
            message: 'User not found!',
        });
    } else {
        res.status(200).json({
            statusCode: 200,
            message: 'User successfully found into MongoDB database',
            data: user
        })
    }

});

app.use((req, res) => {
    const {path} = req;
    res.status(404).json({
        statusCode: 404,
        message: 'Not Found - ' + path,
    });
});







