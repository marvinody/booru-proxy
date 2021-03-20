const express = require('express')
const axios = require('axios')

const app = express()

app.use(require('morgan')('dev'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/*', (req, res, next) => {
  const wanted_url = req.params[0]
  const url = `https://danbooru.donmai.us/data/${wanted_url}`
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
