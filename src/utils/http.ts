import axios from 'axios'

export default function InitAxios() {
    return axios.create({
        baseURL: 'http://localhost:5000/',
        timeout: 10000
    })
}
