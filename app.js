const express = require('express')
const axios = require('axios')

const app = express()

app.use(require('morgan')('dev'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})
// file url
app.get('/:url', (req, res, next) => {
  const url = `https://danbooru.donmai.us/data/${req.params.url}`
  proxy_booru(url, req, res, next)
})
// large file url
app.get('/sample/:url', (req, res, next) => {
  const url = `https://danbooru.donmai.us/data/sample/${req.params.url}`
  proxy_booru(url, req, res, next)
})

const proxy_booru = (url, req, res, next) => {
  // console.log('\t' + url)
  axios({
    method: 'get',
    url,
    responseType: 'stream'
  })
    .then(function (response) {
      res.setHeader('cache-control', 'max-age=90019001')
      response.data.pipe(res)
    }).catch(err => {
      res.send(err)
    })
}

const port = process.env.PORT || 7000
app.listen(port, () => {
  console.log('listening on ' + port)
})
