import axios from 'axios'

const apiUrl = 'http://localhost:8080/api/box'

const BoxManagementService = {
  isBoxEmpty (boxNumber) {
    return axios.post(apiUrl + '/isFree', boxNumber, {
      headers: { 'Content-Type': 'application/json' },
    })
  },
}

export default BoxManagementService
