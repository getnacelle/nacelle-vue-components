import createStoreConfig from '../../src/store/storeConfig'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import * as Cookies from 'es-cookie'
process.browser = true
describe('User Store', () => {
  it('sets user data ', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeConfig = createStoreConfig()
    const store = new Vuex.Store(storeConfig)

    store.commit('user/setUserData', {
      customerID: '123456',
      customerEmail: 'test@test.com'
    })
    expect(store.state.user.customerID).toEqual('123456')
    expect(store.state.user.customerEmail).toEqual('test@test.com')
  })

  it('creates a session cookie and sets the session id', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeConfig = createStoreConfig()
    const store = new Vuex.Store(storeConfig)
    store.dispatch('user/createSession')
    let cookie = Cookies.get('session-id')
    expect(store.state.user.sessionID).not.toBeNull()
    expect(cookie).toBeDefined()
  })

  it('reads the session cookie', async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeConfig = createStoreConfig()
    const store = new Vuex.Store(storeConfig)
    store.dispatch('user/readSession')
    expect(store.state.user.sessionID).not.toBeNull()
  })
})
