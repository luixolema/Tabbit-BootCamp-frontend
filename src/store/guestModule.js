const guestModule = {
 namespaced: true,
 state: {
     selectedGuest: undefined,
 },
 /* Guettes are for retuning modified state (like computed properties) */
 getters: {
 },
 mutations: {
    setSelectedGuest (state, payload) {
        state.selectedGuest = payload
    },
    removeSelectedGuest (state) {
        state.selectedGuest = undefined
    },
    updateSelectedGuest (state, payload) {
        state.selectedGuest.firstName = payload.guestPersonalDetails.firstName
        state.selectedGuest.lastName = payload.guestPersonalDetails.lastName
        state.selectedGuest.boxNumber = payload.stayDetails.boxNumber
    },
 },
 actions: {},
}

export default guestModule
