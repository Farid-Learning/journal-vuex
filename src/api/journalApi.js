import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://daybook-vue-default-rtdb.firebaseio.com'
})

export default journalApi