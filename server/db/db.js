const sha1 = require('sha1')
const axios = require('axios')

const baseUrl = 'https://d.apicloud.com/mcm/api'
const className = 'todo'
const preName = `${baseUrl}/${className}`

// const request = axios.create({
//   baseUrl: 'https://d.apicloud.com/mcm/api'
// })
const request = axios.create()

const createError = (code, resp) => {
  const err = new Error(resp.message)
  err.code = code
  return err
}

const handleRequest = ({ status, data, ...rest}) => {
  // console.log('params: ',status, data,rest)
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}

module.exports = (appId, appKey) => {
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    async getAllTodos () {
      return handleRequest(await request.get(`${preName}`, {headers: getHeaders()}))
    },
    async addTodo (todo) {
      return handleRequest(await request.post(`${preName}`, todo, {headers: getHeaders()}))
    },
    async updateTodo (id, todo) {
      return handleRequest(await request.put(`${preName}/${id}`, todo, {headers: getHeaders()}))
    },
    async deleteTodo (id) {
      return handleRequest(await request.delete(`${preName}/${id}`, {headers: getHeaders()}))
    },
    async deleteCompleted (ids) {
      const requests = ids.map(id => {
        return {
          method: 'DELETE',
          path: `/mcm/api/${className}/${id}`
        }
      })
      return handleRequest(await request.post(`${baseUrl}/batch`, { requests }, {headers: getHeaders()}))
    }
  }
}
