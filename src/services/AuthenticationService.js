import axios from 'axios'
import { serverUrl } from './httpService'

const loginUrl = serverUrl + '/login'

const AuthenticationService = {
    loginUser (loginDto) {
        return axios.post(loginUrl, loginDto)
    },
}

export default AuthenticationService
