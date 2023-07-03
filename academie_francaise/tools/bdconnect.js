// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://tdu7:<password>@clustertdu7.4hsu38y.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://tdu7:<password>@clustertdu7.4hsu38y.mongodb.net/?retryWrites=true&w=majority";

// async function fetchIDs() {
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//     try {
//         await client.connect();

//         const database = client.db("eMortels");
//         const collection = database.collection("Academie");

//         const documents = await collection.find({ 'sousCategories.nom': 'Les adjectifs de couleur' }, { 'sousCategories.$': 1 }).toArray();

//         console.log(documents);
//         documents.forEach((category) => {
//             console.log(category.nom);

//         });
//     }
//     catch (error) {
//         console.error('Error:', error);
//     }
//     finally {
//         await client.close();
//         console.log('Disconnected from MongoDB');
//     }
// }
// fetchIDs()

const express = require('express');
const bdconnect = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const RouteProducts = require('academie_francaise/tools/router.js')


mongoose.connect('mongodb+srv://tdu7:<password>@clustertdu7.4hsu38y.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(() => {
        console.log("connecion réussie")
    }).catch((error) => {
        console.log(error);
    });

bdconnect.get('/', (req, res) => {

    res.send("hello");
});


bdconnect.use(bodyParser);
bdconnect.use()
module.exports = bdconnect;