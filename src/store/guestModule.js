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
    updateSelectedGuest (state, guest) {
        state.selectedGuest.firstName = guest.firstName || state.selectedGuest.firstName
        state.selectedGuest.lastName = guest.lastName || state.selectedGuest.lastName
        state.selectedGuest.boxNumber = guest.boxNumber || state.selectedGuest.boxNumber
        state.selectedGuest.checkedin = guest.checkedin || state.selectedGuest.checkedin
    },
 },
 actions: {},
}

export default guestModule
