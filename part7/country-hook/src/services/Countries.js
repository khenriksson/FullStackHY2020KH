import axios from 'axios'
const baseUrl = 'https://restcountries.eu/rest/v2/'

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/all`)
  return response.data
}

const getByName = async (name) => {
  const response = await axios.get(`${baseUrl}name/${name}?fullText=true/`)
  console.log('URL:', `${baseUrl}name/${name}?fullText=true/`)
  return response.data
}

export default { getAll, getByName }
