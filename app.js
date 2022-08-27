require('dotenv').config();
const express = require('express');
const { SessionsClient } = require("@google-cloud/dialogflow-cx/build/src/v3/sessions_client");
const  { detectIntentText }  = require("./dialogflow_api");

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
      console.log('dialog mmm')
        const result = await detectIntentText(req.body.text)

        console.log('dialog mmm')
        res.status(200).send(result)
        // res.status(200).json({
        //     data: result
        // })
    }catch(err){
        res.status(404).json({
            error:err
        })
    }
    



})


app.get('/channels/api',async (req, res) => {
    res.status(200).json({
        data:[
            
  {
    "_id": "5c8a1f4e2f8fb814b56fa185",
    "name": "Jennifer Hardy",
    "email": "jennifer@example.com",
    "role": "guide",
    "active": true,
    "photo": "user-6.jpg",
    "password": "$2a$12$XCXvvlhRBJ8CydKH09v1v.jpg0hB9gVVfMVEoz4MsxqL9zb5PrF42"
  },
  {
    "_id": "5c8a201e2f8fb814b56fa186",
    "name": "Kate Morrison",
    "email": "kate@example.com",
    "role": "guide",
    "active": true,
    "photo": "user-7.jpg",
    "password": "$2a$12$II1F3aBSFDF3Xz7iB4rk/.a2dogwkClMN5gGCWrRlILrG1xtJG7q6"
  },
  {
    "_id": "5c8a20d32f8fb814b56fa187",
    "name": "Eliana Stout",
    "email": "eliana@example.com",
    "role": "user",
    "active": true,
    "photo": "user-8.jpg",
    "password": "$2a$12$Jb/ILhdDV.ZpnPMu19xfe.NRh5ntE2LzNMNcsty05QWwRbmFFVMKO"
  },
  {
    "_id": "5c8a211f2f8fb814b56fa188",
    "name": "Cristian Vega",
    "email": "chris@example.com",
    "role": "user",
    "active": true,
    "photo": "user-9.jpg",
    "password": "$2a$12$r7/jtdWtzNfrfC7zw3uS.eDJ3Bs.8qrO31ZdbMljL.lUY0TAsaAL6"
  },
  {
    "_id": "5c8a21d02f8fb814b56fa189",
    "name": "Steve T. Scaife",
    "email": "steve@example.com",
    "role": "lead-guide",
    "active": true,
    "photo": "user-10.jpg",
    "password": "$2a$12$q7v9dm.S4DvqhAeBc4KwduedEDEkDe2GGFGzteW6xnHt120oRpkqm"
  },
        ]
    })
})



const server = app.listen(PORT, () => {
    console.log('app server is running........')
})


