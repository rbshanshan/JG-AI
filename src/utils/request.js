import axios from 'axios'
import { API_BASE_URL } from '/constant'

const request = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000
})

export default request
