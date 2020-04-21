import axios from 'axios'

const apiUrl = 'http://localhost:8080/api/stay'

const StayService = {
  findAll () {
      return axios.get(apiUrl)
  },
  findById (stayId) {
    return axios.get(apiUrl + '/' + stayId)
  },
  updateStay (StayDto) {
    return axios.put(apiUrl, StayDto)
  },
  isBoxEmpty (boxNumber) {
    return axios.post(apiUrl + '/boxState', boxNumber, {
      headers: { 'Content-Type': 'application/json' },
    })
  },
}

export default StayService
