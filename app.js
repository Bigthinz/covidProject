const express = require('express');
const { SessionsClient } = require("@google-cloud/dialogflow-cx/build/src/v3/sessions_client");
const { detectIntentText } = require("./dialogflow_api");

const body_parser=require("body-parser");
const axios=require("axios");
require('dotenv').config();

const app=express().use(body_parser.json());
//create a node server
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
    }   
);


app.post('/channels/web', async (req, res) => {

    const result = await detectIntentText(req.body.text)
    res.status(200).send(result)



})



server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);


