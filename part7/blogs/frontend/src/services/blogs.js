import axios from 'axios'
import { likeAction } from '../reducers/blogReducer'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getByUser = (user) => {
  const request = axios.get(`${baseUrl}/${user.id}`)
  console.log('URL:', `${baseUrl}/${user.id}`)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  //   const request = axios.put(`${baseUrl}/${id}`, newObject)

  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const comment = async (id, newObject) => {
  //   const request = axios.put(`${baseUrl}/${id}`, newObject)
  console.log('newObject :>> ', newObject)
  const response = await axios.put(`${baseUrl}/${id}/comments`, newObject)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  //   const request = axios.delete(`${baseUrl}/${id}`)
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, setToken, getByUser, update, remove, comment }
