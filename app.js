const express = require('express')
const axios = require('axios')

const app = express()

app.use(require('morgan')('dev'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/:url', (req, res, next) => {
  axios({
    method: 'get',
    url: `https://danbooru.donmai.us/data/${req.params.url}`,
    responseType: 'stream'
  })
    .then(function (response) {
      res.setHeader('cache-control', 'max-age=90019001')
      response.data.pipe(res)
    }).catch(err => {
      res.send(err)
    })
})

const port = process.env.PORT || 7000
app.listen(port, () => {
  console.log('listening on ' + port)
})
