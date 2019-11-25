import uuid from 'uuidv4'
import localforage from 'localforage'
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
    async initUserData(context) {
      await context.dispatch('readAnonymousID')
      await context.dispatch('readSession')
    },

    /// / ANONYMOUS ID ACTIONS //////////////////////////////////////////
    async createAnonymousID(context) {
      const anonymousID = uuid()
      await localforage.set('anonymousID', anonymousID)
      context.commit('setAnonymousID', anonymousID)
    },
    async readAnonymousID(context) {
      const anonymousID = await localforage.get('anonymousID')
      if (anonymousID != null) {
        context.commit('setAnonymousID', anonymousID)
      } else {
        context.dispatch('createAnonymousID')
      }
    },

    /// / SESSION ACTIONS //////////////////////////////////////////
    async createSession(context) {
      const sessionID = uuid()
      context.commit('setSessionID', sessionID)
      if (process.browser) {
        Cookies.set('session-id', sessionID, {
          expires: new Date().setMinutes(30)
        })
      }
    },
    readSession(context) {
      if (process.browser) {
        const sessionCookie = Cookies.get('session-id')
        if (sessionCookie === undefined) {
          context.dispatch('createSession')
        } else {
          context.commit('setSessionID', sessionCookie)
          context.dispatch('refreshSession')
        }
      }
    },
    refreshSession(context) {
      if (process.browser) {
        Cookies.set('session-id', context.state.sessionID, {
          expires: new Date().setMinutes(30)
        })
      }
    }
  }
}

export default user
