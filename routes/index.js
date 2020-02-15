const axios = require('axios')
const multer = require("multer");
// 將上傳的檔案存至 temp 資料夾中
const upload = multer({ dest: "temp/" });
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs')

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.SPEECH_TO_TEXT_IAM_APIKEY,
  }),
  url: process.env.SPEECH_TO_TEXT_URL,
});

module.exports = (app) => {
  app.get('/', (req, res) => {
    return res.render('index')
  })
  app.post('/speechToText', upload.single('myrecord'), (req, res) => {

    const params = {
      audio: fs.createReadStream(req.file.path),
      contentType: 'application/octet-stream',
      timestamps: true,
      word_alternatives_threshold: 0.9,
    };

    speechToText.recognize(params)
      .then(async (response) => {
        console.log(JSON.stringify(response.result, null, 2));
        console.log(response.result.results[0].alternatives[0].transcript);

        // 判斷 speech 中是否有提到 dog
        if (response.result.results[0].alternatives[0].transcript.includes('dog')) {
          // 打 dog API 取得 DOG 圖片連結
          const fetchapi = await axios.get('https://dog.ceo/api/breeds/image/random')
          const data = {
            status: fetchapi.data.status,
            speech: `${response.result.results[0].alternatives[0].transcript}`,
            url: fetchapi.data.message
          }
          return res.json(data)
        } else {
          // Speech 中未提到 dog
          const data = {
            status: 'failure',
            speech: `${response.result.results[0].alternatives[0].transcript}`,
            url: ''
          }
          return res.json(data)
        }
      })
      .catch(err => {
        console.log(err);
      });
  })
}