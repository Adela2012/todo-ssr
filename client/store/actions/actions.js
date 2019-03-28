// import model from '../../model/client-model'
import model from 'model'
import notify from '../../components/notification/function'
import bus from '../../util/bus'
const handleError = (err) => {
  if (err.code === 401) {
    notify({ content: '请先登录' })
    bus.$emit('auth')
  }
}

export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  },
  fetchTodos ({ commit }) {
    commit('startLoading')
    return model.getAllTodos().then(data => {
      commit('fillTodos', data)
      commit('endLoading')
    }).catch(err => {
      commit('endLoading')
      handleError(err)
    })
  },
  addTodo ({ commit }, todo) {
    commit('startLoading')
    return model.createTodo(todo).then(data => {
      commit('addTodo', data)
      notify({ content: '多了一件事' })
      commit('endLoading')
    }).catch(err => {
      commit('endLoading')
      handleError(err)
    })
  },
  updateTodo ({ commit }, { id, todo }) {
    commit('startLoading')
    return model.updateTodo(id, todo).then(data => {
      commit('updateTodo', { id, todo: data })
      commit('endLoading')
    }).catch(err => {
      commit('endLoading')
      handleError(err)
    })
  },
  deleteTodo ({ commit }, id) {
    commit('startLoading')
    return model.deleteTodo(id).then(data => {
      commit('deleteTodo', id)
      notify({ content: '少了一件事' })
      commit('endLoading')
    }).catch(err => {
      commit('endLoading')
      handleError(err)
    })
  },
  deleteAllCompleted ({ commit, state }) {
    const ids = state.todos.filter(t => t.completed).map(t => t.id)
    commit('startLoading')
    return model.deleteTodo(ids).then(data => {
      commit('deleteAllCompleted')
      notify({ content: '清理一下' })
      commit('endLoading')
    }).catch(err => {
      commit('endLoading')
      handleError(err)
    })
  },
  login ({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      commit('startLoading')
      return model.login(username, password).then(data => {
        commit('doLogin', data)
        notify({ content: '登录成功' })
        commit('endLoading')
        resolve()
      }).catch(err => {
        handleError(err)
        commit('endLoading')
        reject(err)
      })
    })
  }
}
