import axios from 'axios'

const apiUrl = 'http://localhost:8080/api/box'

const BoxManagementService = {
  isBoxEmpty (boxNumber) {
    return axios.get(apiUrl + '/' + boxNumber + '/isFree')
  },
}

export default BoxManagementService
