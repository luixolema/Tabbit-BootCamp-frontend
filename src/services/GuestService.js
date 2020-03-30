import axios from 'axios'

const apiUrl = 'http://localhost:8080/api/guests'

const GuestService = {
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

export default GuestService
