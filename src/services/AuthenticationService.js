import axios from 'axios'

const apiUrl = 'http://localhost:8080/login'

const AuthenticationService = {
    loginUser (loginDto, successCallback, failCallback) {
        axios.post(apiUrl, loginDto).then((response) => {
            if (successCallback) {
                successCallback(response)
            }
        })
        .catch((error) => {
            if (failCallback) {
                failCallback(error)
            }
        })
    },
}

export default AuthenticationService
