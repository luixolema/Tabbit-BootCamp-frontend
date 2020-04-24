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
  checkInGuest (CheckInDto) {
    return axios.post(apiUrl + '/check-in', CheckInDto)
  },
  getGuestInfo (guestId) {
    return axios.get(apiUrl + '/' + guestId)
  },
  updateGuest (guestInfo) {
    return axios.put(apiUrl, guestInfo)
  },
  getGuestPersonalDetails (guestId) {
    return axios.get(apiUrl + '/' + guestId + '/personal-details')
  },
  AddGuest (createGuestDto) {
    return axios.post(apiUrl, createGuestDto)
  },
}

export default GuestService
