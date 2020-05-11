// import axios from 'axios'

import { http, serverUrl } from './httpService'

const ContextService = {
  getContext () {
    return http.get(serverUrl + '/contextInfo')
  },
}

export default ContextService
