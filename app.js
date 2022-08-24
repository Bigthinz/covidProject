require('dotenv').config();
const express = require('express');
const { SessionsClient } = require("@google-cloud/dialogflow-cx/build/src/v3/sessions_client");
const { detectIntentText } = require("./dialogflow_api");

const body_parser=require("body-parser");
const axios=require("axios");



const app=express();

app.use(body_parser.json())

app.use(express.json({ limit: '10kb' }))
//create a node server
// const server = require('http').createServer(app);
const PORT = process.env.PORT;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
    }   
);


app.post('/channels/web', async (req, res) => {

    try{
        const result = await detectIntentText(req.body.text)
        // res.status(200).send(result)
        res.status(200).json({
            data: result
        })
    }catch(err){
        res.status(404).json({
            error:err
        })
    }
    



})



const server = app.listen(PORT, () => {
    console.log('app server is running........')
})


