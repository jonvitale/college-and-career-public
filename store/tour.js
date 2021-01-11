export const state = () => ({
  main_initialized: false,
})

export const mutations = {
  set_main_initialized(state, val) {
    state.main_initialized = val
  },
}

export const actions = {
  initialize_main({ commit }) {
    commit('set_main_initialized', true)
  },
}
