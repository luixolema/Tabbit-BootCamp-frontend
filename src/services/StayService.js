import axios from 'axios'

const apiUrl = 'http://localhost:8080/api/stay'

const StayService = {
  findAll () {
      return axios.get(apiUrl)
  },
  findById (stayId) {
    return axios.get(apiUrl + '/' + stayId)
  },
  updateStay (stayInfo) {
    return axios.put(apiUrl, stayInfo)
  },
}

export default StayService
