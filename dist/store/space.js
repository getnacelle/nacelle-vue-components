const space = {
  namespaced: true,
  state: {
    id: '',
    name: '',
    domain: '',
    metafields: [],
    linklists: [],
    facebookCatalogID: ''
  },
  mutations: {
    setId(state, id) {
      state.id = id
    },

    setName(state, name) {
      state.name = name
    },

    setDomain(state, domain) {
      state.domain = domain
    },

    setMetafields(state, metafields) {
      state.metafields = metafields
    },

    addMetafield(state, metafield) {
      state.metafields.push(metafield)
    },

    setLinklists(state, payload) {
      state.linklists = payload
    },

    addLinklist(state, linklist) {
      state.linklists.push(linklist)
    }
  },
  getters: {
    metafieldsObj(state) {
      return state.metafields.reduce((obj, metafield) => {
        const { namespace, key, value } = metafield

        if (obj[namespace]) {
          obj[namespace][key] = value
        } else {
          obj[namespace] = {}
          obj[namespace][key] = value
        }

        return obj
      }, {})
    },
    getMetatag: (state) => (tag) => {
      return state.metafields.find(field => (
        field.namespace === 'metatag' && field.key === tag
      ))
    },
    getMetaNamespace: (state) => (namespace) => {
      return state.metafields.reduce((obj, metafield) => {
        if (metafield.namespace === namespace) {
          obj[metafield.key] = metafield.value
        }

        return obj
      }, {})
    },
    getMetafield: (state) => (namespace, key) => {
      const metafield = state.metafields.find(field => (
        field.namespace === namespace && field.key === key
      ))

      if (metafield) {
        return metafield.value
      }

      return undefined
    },
    getLinks: (state) => handle => {
      if (state.linklists) {
        const linklist = state.linklists.find(
          linklist => linklist.handle === handle
        )

        if (linklist) {
          return linklist.links
        }

        return []
      }

      return []
    }
  },
  actions: {
    updateSpace({ commit }, space) {
      if (space) {
        const { id, name, domain, metafields, linklists } = space

        if (id) {
          commit('setId', id)
        }

        if (name) {
          commit('setName', name)
        }

        if (domain) {
          commit('setDomain', domain)
        }

        if (metafields) {
          commit('setMetafields', metafields)
        }

        if (linklists) {
          commit('setLinklists', linklists)
        }
      }
    }
  }
}

export default space
