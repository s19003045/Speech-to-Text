const axios = require('axios')

axios.get('https://dog.ceo/api/breeds/image/random')
  .then(res => {
    console.log(res.data)
  })