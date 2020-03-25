const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs')
// const files = ['./audio-file.flac', 'dogs_cats.m4a']
const files = ['./audio/audio-file.flac']

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: 'U2iMdfkuU0aFY8LTSXFVGbptBk2YrXKrDxtcK6VfmdkV',
  }),
  url: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/51668c53-6401-46cb-ad0f-ab19a6330451',
});

// for (file in files) {


const params = {
  audio: fs.createReadStream('./temp/my-uploads/myrecord-1581770919891'),
  // contentType: 'audio/flac',
  contentType: 'application/octet-stream',
  timestamps: true,
  word_alternatives_threshold: 0.9,
  keywords: ['colorado', 'tornado', 'tornadoes'],
  keywordsThreshold: 0.5,
};

speechToText.recognize(params)
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
    console.log(response.result.results[0].alternatives[0].transcript);
  })
  .catch(err => {
    console.log(err);
  });


// }


// speechToText.listModels()
//   .then(speechModels => {
//     console.log(JSON.stringify(speechModels, null, 2));
//   })
//   .catch(err => {
//     console.log('error:', err);
//   });
