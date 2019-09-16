import store from '../../src/store/store'

describe('Space Store', () => {
  it('adds a metafield to metafields array', async () => {
    store.commit('space/addMetafield', {
      namespace: 'metatag',
      key: 'og:image',
      value: 'https://demo.getnacelle.com/starship_logo.png'
    })
    expect(store.state.space.metafields).toEqual([
      {
        namespace: 'metatag',
        key: 'og:image',
        value: 'https://demo.getnacelle.com/starship_logo.png'
      }
    ])
  })

  it('get namespace returns namespace object', async () => {
    store.state.space.metafields = [
      {
        namespace: 'metatag',
        key: 'description',
        value: 'The future of furniture'
      }
    ]

    const metatags = store.getters['space/getMetaNamespace']('metatag')

    expect(metatags).toEqual({
      description: 'The future of furniture'
    })
  })
})
