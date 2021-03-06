const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;
// use middleWare 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dpull.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const toDoCollection = client.db('tasky').collection('todos');
        const completedCollection = client.db('tasky').collection('completed');
        // all todos api
        app.get('/todos', async (req, res) => {
            const query = {};
            const cursor = toDoCollection.find(query);
            const todos = await cursor.toArray();
            res.send(todos);
        });
        // all todos api
        app.get('/completed', async (req, res) => {
            const query = {};
            const cursor = completedCollection.find(query);
            const completed = await cursor.toArray();
            res.send(completed);
        });
        //POST
        app.post('/todos', async (req, res) => {
            const newTodo = req.body;
            const result = await toDoCollection.insertOne(newTodo);
            res.send(result)
        });
        // posting completed task
        app.post("/completed", async (req, res) => {
            const completed = req.body;
            const result = await completedCollection.insertOne(completed);
            res.send(result);
        });
        // DELETE 
        app.delete('/todo/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { _id: ObjectId(id) };
            const result = await toDoCollection.deleteOne(query);
            res.send(result);
        });
        // DELETE for completed task
        app.delete('/completed/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: id };
            console.log(query);
            const result = await completedCollection.deleteOne(query);
            res.send(result);
        });


        app.put("/upToDo/:id", async (req, res) => {
            const id = req.params.id;
            const todo = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
              $set: {
                data: todo.updateTodo,
              }
            };
            const Todo = await toDoCollection.updateOne(filter, updateDoc, options);
            res.send({ success: true, data: Todo });
          });
        // Update or Modify Task
        app.put('/todos/:id', async (req, res) => {
            const id = req.params.id;
            const updatedTodo = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    task: updatedTodo.task,
                }
            };
            const result = await toDoCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });
    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running Tasky Server!!!')
});

app.listen(port, () => {
    console.log('Listening to port', port);
});

