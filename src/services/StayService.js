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
}

export default StayService
