const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion} = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dpull.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const toDoCollection = client.db('tasky').collection('todos');
        // all todos api
        app.get('/todos', async (req, res) => {
            const query = {};
            const cursor = toDoCollection.find(query);
            const todos = await cursor.toArray();
            res.send(todos);
        });
        //POST
        app.post('/todo', async (req, res) => {
            const newTodo = req.body;
            const result = await toDoCollection.insertOne(newTodo);
            res.send(result)
        });
    }
    finally{

    }
}
run().catch(console.dir);

// use middleWare 
app.use(cors());
app.use(express.json());

















app.get('/', (req, res) => {
    res.send('Running Tasky Server!!!')
});

app.listen(port, () => {
    console.log('Listening to port', port);
});