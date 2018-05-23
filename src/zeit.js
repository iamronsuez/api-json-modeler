
module.exports = {
  baseURL: 'https://api.zeit.co',
  routes: [{
    key: 'deployments',
    method: 'GET',
    url: (id = '') => `/v2/now/deployments/${id}`,
  },
  {
    key: 'domains',
    method: 'GET',
    url: (extra = '') => `/v2/now/domains${extra}`,
  },
],
  headers: {
    'Authorization': `Bearer ${process.env.ZEIT_TOKEN}`
  }
}