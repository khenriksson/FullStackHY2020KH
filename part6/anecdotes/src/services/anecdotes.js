import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

const createNew = async (content, id, votes) => {
  const object = { content, id, votes }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default { getAll, createNew }
