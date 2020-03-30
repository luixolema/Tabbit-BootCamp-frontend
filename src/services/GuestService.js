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
  getGestInfo (guestId) {
    /** Mock data to test TODO: remove it after finish the api */
    // return Promise.resolve({
    //   data: {
    //     stays: [
    //       null,
    //       {
    //         id: 1,
    //         checkInDate: '12.02.2020',
    //         checkOutDate: '12.02.2020',
    //       },
    //     ],
    //     guest: null,
    //   },
    // })

    return axios.get(apiUrl + '/' + guestId)
  },
}

export default GuestService
