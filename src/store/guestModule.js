export default {
 namespaced: true,
 state: {
     selectedGuest: undefined,
 },
 /* Guettes are for retuning modified state (like computed properties) */
 getters: {
    selectedGuest: state => {
        return state.selectedGuest
    },
 },
 mutations: {
    setSelectedGuest (state, payload) {
        state.selectedGuest = payload
    },
 },
 actions: {},
}
