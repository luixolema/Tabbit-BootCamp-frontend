import axios from 'axios'

const apiUrl = 'http://localhost:8080/api/guests'

const GuestService = {
  findAll () {
      return axios.get(apiUrl)
  },
  findByCheckin (checkin) {
    const url = new URL(apiUrl)
    url.searchParams.append('checkedIn', checkin)
    return axios.get(url.href)
  },
  checkInGuests (guestId) {
    return axios.put(apiUrl + '/checkIn', guestId)
  },
  getGuestInfo (guestId) {
    return axios.get(apiUrl + '/' + guestId)
  },
  updateGuest (guestInfo) {
    return axios.put(apiUrl, guestInfo)
  },
}

export default GuestService
