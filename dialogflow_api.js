require('dotenv').config();
const { SessionsClient } = require("@google-cloud/dialogflow-cx/build/src/v3/sessions_client");
const fs = require('fs');






// [START dialogflow_cx_detect_intent_text]
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
     const projectId = `${process.env.DF_PROJECT_ID}`;
     const location = `${process.env.LOCATION}`
     const agentId = `${process.env.AGENT_ID}`
     const query = 'Hello';
     const languageCode = `${process.env.LANGUAGE}`
 
  const sessionNum = Math.floor(1000 + Math.random() * 9000)

     const client = new SessionsClient(
         {
             apiEndpoint: `${process.env.API_ENDPOINT}`,
             projectId : `${process.env.DF_PROJECT_ID}`,
             credentials : {
                 client_email : `${process.env.DF_CLIENT_EMAIL}`,
                 private_key: `${process.env.DF_PRIVATE_KEY}`,
             },
             language: `${process.env.LANGUAGE}`
         }
     );
   
     const detectIntentText  = async(queryInput)=> {
         const sessionId = '87889354896552'
 
      //  const sessionId = Math.random().toString(36).substring(7);
       const sessionPath = client.projectLocationAgentSessionPath(
         projectId,
         location,
         agentId,
         sessionId
       );
       const request = {
         session: sessionPath,
         queryInput: {
           text: {
             text: queryInput,
           },
           languageCode,
         },
       };
       
       const [response] = await client.detectIntent(request);
     //   console.log(response)
       for (const message of response.queryResult.responseMessages) {
         if (message.text) {
           console.log(`Agent Response: ${message.text.text}`);
           
         }
       }
       if (response.queryResult.match.intent) {
         console.log(
           `Matched Intent: ${response.queryResult.match.intent.displayName}`
         );
 
         
       }
       console.log(
         `Current Page: ${response.queryResult.currentPage.displayName}`
       );
     return response;
     }
   

     module.exports = {
        detectIntentText
    };