const express = require('express');
const  cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();


app.use(cors());
app.use(bodyParser.json());

const dbUser = process.env.DB_USER;
const pass = process.env.DB_PASS;
const uri = `mongodb+srv://${dbUser}:${pass}@cluster0.33r75.mongodb.net/<dbname>?retryWrites=true&w=majority`;



let client = new MongoClient(uri, { useNewUrlParser: true });
const users = ['Asad', 'Monir', 'Saira', 'Sabil']





app.get('/products', (req, res) =>{

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineShop").collection("products");
        collection.find().limit(5).toArray((err, documents)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(documents);
            }
        
        }) 
        client.close();
      });


});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const name = users[id];
    res.send({id, name});
})

//post
app.post('/addProduct', (req, res) =>{
    
    const product = req.body;
    
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineShop").collection("products");
        collection.insertOne(product,(err, result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result.ops[0]);
            }
        
        }) 
        client.close();
      });

    
})



app.listen(1000, () => console.log('listening to port 1000'))