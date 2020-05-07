import { http, serverUrl } from './httpService'

const apiUrl = serverUrl + '/api/box'

const BoxManagementService = {
  isBoxEmpty (boxNumber) {
    return http.get(apiUrl + '/' + boxNumber + '/isFree')
  },
}

export default BoxManagementService
