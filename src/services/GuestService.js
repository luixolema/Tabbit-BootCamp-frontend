import axios from 'axios'

const apirUrl = 'http://localhost:3000/guests'

export default {
  findAll () {
      return axios.get(apirUrl)
  },
  findByCheckin (checkin) {
    const url = new URL(apirUrl)
    url.searchParams.append('checkin', checkin)
    console.log(url)
    return axios.get(url.href)
  },
  checkInGuests (guestsIds) {
    return axios.put(apirUrl + '/checkin', guestsIds)
  },
}