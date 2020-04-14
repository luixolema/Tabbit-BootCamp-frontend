import Vue from 'vue'
import Vuex from 'vuex'
import guestModule from './store/guestModule'
import stayModule from './store/stayModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    guestModule,
    stayModule,
  },
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://images.pexels.com/photos/3046582/pexels-photo-3046582.jpeg',
    drawer: null,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
  },
  actions: {

  },
})
