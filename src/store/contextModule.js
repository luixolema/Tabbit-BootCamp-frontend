const contextModule = {
 namespaced: true,
 state: {
    contextData: {},
 },
 mutations: {
    setContextData (state, payload) {
        state.contextData = payload
    },
 },
 actions: {},
}

export default contextModule
