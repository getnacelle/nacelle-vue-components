import store from '../../src/store/store'

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
})
