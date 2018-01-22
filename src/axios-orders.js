import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-react-app-bdea1.firebaseio.com/'
})

export default instance