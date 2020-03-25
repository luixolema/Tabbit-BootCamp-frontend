import Vue from 'vue'

export default {
  error (msg, error) {
    msg = msg || 'Unknown error'
    Vue.notify({
      title: 'Error',
      text: msg,
      type: 'error',
    })
  },
  sucess (msg) {
    Vue.notify({
      title: 'Success',
      text: msg,
      type: 'success ',
    })
  },
  info (msg) {
    Vue.notify({
      title: 'Info',
      text: msg,
    })
  },
  warning (msg) {
    Vue.notify({
      title: 'Warning',
      text: msg,
    })
  },
}
