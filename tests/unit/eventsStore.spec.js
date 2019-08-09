import store from '../../src/store/store'
import Cookies from 'js-cookie'

jest.mock('js-cookie', () => {
  return {
    get: () => 'abcd',
    set: () => {}
  }
})


describe('Event Store', () => {
  it('adds event to log array', async () => {
    store.dispatch('events/pageView', 'New Page')

    expect(store.state.events.log).toEqual([
      {
        event: 'PAGE_VIEW',
        page: 'New Page'
      }
    ])
  })

  it('get and set user id from cookie', () => {
    store.dispatch('events/getUserId')

    expect(store.state.events.anonymousId).toBe('abcd')
  })
})
