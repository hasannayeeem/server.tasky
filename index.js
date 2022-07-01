// const express = require('express');
// const cors = require('cors');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// require('dotenv').config();
// const app = express();
// const port = process.env.PORT || 8000;

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dpull.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// async function run() {
//     try {
//         await client.connect();
//         const toDoCollection = client.db('tasky').collection('todos');
//         // all todos api
//         // app.get('/todos', async (req, res) => {
//         //     const query = {};
//         //     const cursor = toDoCollection.find(query);
//         //     const todos = await cursor.toArray();
//         //     res.send(todos);
//         // });
//         //POST
//         app.post('/todos', async (req, res) => {
//             const newTodo = req.body;
//             const result = await toDoCollection.insertOne(newTodo);
//             res.send(result)
//         });
//         // DELETE 
//         app.delete('/todo/:id', async (req, res) => {
//             const id = req.params.id;
//             // console.log(id);
//             const query = { _id: ObjectId(id) };
//             const result = await toDoCollection.deleteOne(query);
//             res.send(result);
//         });
//         // Update or Modify Task
//         app.put('/todos/:id', async (req, res) =>{
//             const id = req.params.id;
//             const updatedTodo = req.body;
//             const filter = {_id: ObjectId(id)};
//             const options = { upsert: true};
//             const updatedDoc = {
//                 $set: {
//                     task: updatedTodo.task,
//                 }
//             };
//             const result = await toDoCollection.updateOne(filter, updatedDoc, options);
//             res.send(result);
//         });
//     }
//     finally {

//     }
// }
// run().catch(console.dir);

// // use middleWare 
// app.use(cors());
// app.use(express.json());

















// app.get('/', (req, res) => {
//     res.send('Running Tasky Server!!!')
// });

// app.listen(port, () => {
//     console.log('Listening to port', port);
// });


const express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');
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
        const productCollection = client.db('autoStars').collection('product');
        // all products api
        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });
        // single product api 
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const product = await productCollection.findOne(query);
            res.send(product);
        });

        //POST
        app.post('/products', async (req, res) => {
            const newService = req.body;
            const result = await productCollection.insertOne(newService);
            res.send(result)
        });

        // 
        // DELETE 
            app.delete('/products/:id', async (req, res) => {
                const id = req.params.id;
                // console.log(id);
                const query = { _id: ObjectId(id) };
                const result = await productCollection.deleteOne(query);
                res.send(result);
        });

        // use post to get products by ids 
        // app.post('/productsByKeys', async (req, res) =>{
        //     const keys = req.body;
        //     // console.log(keys);
        //     const ids = keys.map(id => ObjectId(id));
        //     const query = {_id: {$in: ids}}
        //     const cursor = productCollection.find(query);
        //     const products = await cursor.toArray();
        //     res.send(products);
        // });

        // Update quantity api for delivered
        app.put('/products/:id', async (req, res) =>{
            const id = req.params.id;
            const updatedProduct = req.body;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true};
            const updatedDoc = {
                $set: {
                    quantity: updatedProduct.quantity,
                }
            };
            const result = await productCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });
        // Update quantity api for added
        app.put('/products/:id', async (req, res) =>{
            const id = req.params.id;
            const updatedProduct = req.body;
            console.log(updatedProduct);
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true};
            const updatedDoc = {
                $set: {
                    quantity: updatedProduct.quantity,
                }
            };
            const result = await productCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });

        
    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running AutoStars Server!!!')
});

app.listen(port, () => {
    console.log('Listening to port', port);
});