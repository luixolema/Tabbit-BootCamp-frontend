import axios from 'axios'

const apiUrl = 'http://localhost:3000/guests'

export default {
  findAll () {
      return axios.get(apiUrl)
  },
  findByCheckin (checkin) {
    const url = new URL(apiUrl)
    url.searchParams.append('checkedIn', checkin)
    console.log(url)
    return axios.get(url.href)
  },
  checkInGuests (guestsIds) {
    return axios.put(apiUrl + '/checkIn', guestsIds)
  },
}
