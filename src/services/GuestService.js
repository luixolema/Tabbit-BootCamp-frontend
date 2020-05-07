import { http, serverUrl } from './httpService'

const apiUrl = serverUrl + '/api/guests'

const GuestService = {
  findAll () {
      return http.get(apiUrl)
  },
  findByCheckin (checkin) {
    const url = new URL(apiUrl)
    url.searchParams.append('checkedIn', checkin)
    return http.get(url.href)
  },
  checkInGuest (CheckInDto) {
    return http.post(apiUrl + '/check-in', CheckInDto)
  },
  getGuestInfo (guestId) {
    return http.get(apiUrl + '/' + guestId)
  },
  updateGuest (guestInfo) {
    return http.put(apiUrl, guestInfo)
  },
  getGuestPersonalDetails (guestId) {
    return http.get(apiUrl + '/' + guestId + '/personal-details')
  },
  AddGuest (guestCreationDto) {
    return http.post(apiUrl, guestCreationDto)
  },
}

export default GuestService
