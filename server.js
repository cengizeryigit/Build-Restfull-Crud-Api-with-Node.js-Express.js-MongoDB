const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes


app.get('/product', async(req, res) => {
    try{
        const product = await  Product.find({});
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

app.get('/product/:id', async(req, res) => {    
    try {
        const {id} = req.params;           
        const product = await Product.findById(id);   
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.post('/product', async(req, res) =>{
    try{
        const product = await  Product.create(req.body);
        res.status(200).json(product);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

app.put('/product/:id', async(req, res) => {    
    try {
        const {id} = req.params;           
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message: `connot find any product with ID ${id}`});
        }  
        const uptadedProduct = await Product.findById(id);       
        res.status(200).json(uptadedProduct);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});


app.delete('/product/:id', async(req, res) => {    
    try {
        const {id} = req.params;           
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `connot find any product with ID ${id}`});
        }         
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

mongoose.set("strictQuery", false);
mongoose
.connect('mongodb+srv://cengizeryigit58:ceza1997@buildrestfullcrudapi.foem3jl.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDb');
    app.listen(3000, ()=>{
        console.log(`Node Api app is running on port 3000`);
    }); 
})
.catch(()=> {
    console.log(error);
})