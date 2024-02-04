import axios from "axios"

const { VITE_SERVER_URL: BASE_URL } = import.meta.env

axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true

export default axios
