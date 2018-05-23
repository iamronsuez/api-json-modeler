require('dotenv').config()

const  {API} = require('./src/api')
const {baseURL, headers, routes} = require('./src/zeit')
const url = require('url')

const ZeitAPI = new API(baseURL, headers, routes)

module.exports = async (req) => {
  const {path} = url.parse(req.url, true);
  const {data} = await ZeitAPI.request(path)

  return {
    date: new Date(),
    data
  }
}