const stayModule = {
 namespaced: true,
 state: {
    stayData: undefined,
 },
 /* Guettes are for retuning modified state (like computed properties) */
 getters: {
 },
 mutations: {
    setStayData (state, payload) {
        state.stayData = payload
    },
    removeStayData (state) {
        if (state.stayData) {
        state.stayData.guestPersonalDetails = {}
        state.stayData.stayDetails = {}
        }
    },
 },
 actions: {},
}

export default stayModule
