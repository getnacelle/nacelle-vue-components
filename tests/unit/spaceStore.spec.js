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

  it('metafieldsObj returns metafields object', async () => {
    store.state.space.metafields = [
      {
        namespace: 'metatag',
        key: 'description',
        value: 'The future of furniture'
      },
      {
        namespace: 'icons',
        key: 'twitter',
        value: 'mock_url'
      },
      {
        namespace: 'icons',
        key: 'facebook',
        value: 'mock_url'
      }
    ]

    expect(store.getters['space/metafieldsObj']).toEqual({
      metatag: {
        description: 'The future of furniture'
      },
      icons: {
        twitter: 'mock_url',
        facebook: 'mock_url'
      }
    })
  })

  it('updateSpace sets space', async () => {
    const id = '12345'
    const name = 'test-store'
    const domain = 'test-store.com'
    const space = {
      id,
      name,
      domain,
      metafields: []
    }

    store.dispatch('space/updateSpace', space)

    expect(store.state.space.id).toEqual(id)
    expect(store.state.space.name).toEqual(name)
    expect(store.state.space.domain).toEqual(domain)
    expect(store.state.space.metafields.length).toEqual(0)
  })
})
