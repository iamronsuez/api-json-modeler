const axios = require('axios')
const UrlPattern = require('url-pattern')

class API {

  constructor(baseURL, headers = {} , routes = []) {
    this.routes = routes;
    this.connector = axios.create({
      baseURL: baseURL,
      timeout: 10000,
      headers: headers
    });
  }

  router(method) {
    const resource = this.routes.find((({
      key
    }) => key === method))

    if (!resource)
      throw new Error(`Invalid Resource ${method}`)

    return resource
  }

  urlParser(path) {
    const pattern = new UrlPattern('/(:resource)(/)(:id)(/*)')
    const matches = pattern.match(path) 
    const {resource, id} = matches

    return {
      resource, id
    }
  }
  
  async request(path = '') {
    try {
      const {resource, id } = this.urlParser(path)
      const {url, method} = this.router(resource)
      const response = await this.connector.request({
        method, url: url(id)
      });

      return response
    } catch (err) {
      throw err
    }

  }
}

module.exports.API = API;