import axios from 'axios'

const apiUrl = 'http://localhost:8081/api/guests'

export default {
  findAll () {
      return axios.get(apiUrl)
  },
  findByCheckin (checkin) {
    const url = new URL(apiUrl)
    url.searchParams.append('checkIn', checkin)
    return axios.get(url.href)
  },
  checkInGuests (guestsIds) {
    return axios.put(apiUrl + '/checkIn', guestsIds)
  },
}
