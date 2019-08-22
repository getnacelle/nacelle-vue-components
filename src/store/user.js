import uuid from 'uuidv4'
import * as Cookies from 'es-cookie'
const user = {
  namespaced: true,
  state: {
    anonymousID: null,
    customerID: null,
    customerEmail: null,
    sessionID: null,
    language: 'en-US'
  },
  mutations: {
    setUserData(state, payload) {
      state.customerID = payload.customerID
      state.customerEmail = payload.customerEmail
    },
    setAnonymousID(state, id) {
      state.anonymousID = id
    },
    setSessionID(state, id) {
      state.sessionID = id
    },
    setLanguage(state, language) {
      state.language = language
    }
  },
  actions: {
    createSession(context) {
      let anonymousID = uuid()
      let sessionID = uuid()
      context.commit('setAnonymousID', anonymousID)
      context.commit('setSessionID', sessionID)
      if (process.browser) {
        Cookies.set('session', JSON.stringify({ anonymousID, sessionID }))
      }
    },
    readSession(context) {
      if (process.browser) {
        let sessionCookie = Cookies.get('session')
        if (sessionCookie == undefined) {
          context.dispatch('createSession')
        } else {
          context.commit(
            'setAnonymousID',
            JSON.parse(sessionCookie).anonymousID
          )
          context.commit('setSessionID', JSON.parse(sessionCookie).sessionID)
          context.dispatch('refreshSession')
        }
      }
      Cookies.set
    },
    refreshSession(context) {
      Cookies.set(
        'session',
        JSON.stringify({
          anonymousID: context.state.anonymousID,
          sessionID: context.state.sessionID
        })
      )
    }
  }
}

export default user
