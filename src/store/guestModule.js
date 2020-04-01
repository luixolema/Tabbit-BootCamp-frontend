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
 },
 actions: {},
}

export default guestModule
