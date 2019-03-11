import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'
export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions
    // plugins: [
    //   (store) => {
    //     console.log('my plugins invoked')
    //   }
    // ]
    // modules: {
    //   a: {
    //     namespaced: true,
    //     state: {
    //       text: 111
    //     },
    //     mutations: {
    //       updateText (state, num) {
    //         state.text += num
    //       }
    //     },
    //     getters: {
    //       textPlus (state, getters, rootState) {
    //         return state.text + rootState.b.text
    //       }
    //     },
    //     actions: {
    //       add ({state, commit, rootState}) {
    //         setTimeout(() => {
    //           // commit('updateText', rootState.count)
    //           commit('updateCount', 56789, {root: true})
    //         }, 1000);
    //       }
    //     }
    //   },
    //   b: {
    //     namespaced: true,
    //     state: {
    //       text: 222
    //     },
    //     actions: {
    //       testAction ({state, commit, rootState}) {
    //         commit('a/updateText', 12345, {root: true})
    //       }
    //     }
    //   }
    // }
  })

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
