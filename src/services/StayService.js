import { http, serverUrl } from './httpService'

const apiUrl = serverUrl + '/api/stay'

const StayService = {
  findAll () {
      return http.get(apiUrl)
  },
  findById (stayId) {
    return http.get(apiUrl + '/' + stayId)
  },
  updateStay (StayDto) {
    return http.put(apiUrl, StayDto)
  },
}

export default StayService
