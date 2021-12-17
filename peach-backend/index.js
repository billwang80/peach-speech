const express = require('express')
const app = express()
const port = 8000

require("dotenv").config();
const cors = require('cors')

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

app.use(express.json())
app.use(cors())

app.post('/tone', async (req, res) => {
  const toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    authenticator: new IamAuthenticator({
      apikey: process.env.API_KEY, // change this
    }),
    serviceUrl: 'https://api.us-east.tone-analyzer.watson.cloud.ibm.com',
  })

  const text = req.body.data

  const toneParams = {
    toneInput: { 'text': text },
    contentType: 'application/json'
  }

  toneAnalyzer.tone(toneParams)
    .then(toneAnalysis => {
      res.json(JSON.stringify(toneAnalysis.result, null, 2))
      console.log("Successful!")
    })
    .catch(err => {
      console.log('error:', err);
    })
})

app.listen(port, () => console.log(`Listening at port ${port}`))
