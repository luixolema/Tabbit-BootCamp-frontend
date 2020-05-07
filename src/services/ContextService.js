// import axios from 'axios'

// const apiUrl = 'http://localhost:8080/api/context'

const ContextService = {
  getContext () {
    return Promise.resolve({ data: { diveCenterName: 'DC test Name', userName: 'test Username' } })
      // return axios.get(apiUrl /** TODO add headers */)
  },
}

export default ContextService
