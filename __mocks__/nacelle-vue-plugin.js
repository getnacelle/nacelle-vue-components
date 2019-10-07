import {
  defaultProduct,
  defaultContent,
  mockProductCollection
} from '../config/defaultObjects'

export default { 
  install (Vue) {
    Vue.prototype.$nacelle = {
      products (handles) {
        const products = handles.map(handle => defaultProduct)

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(products)
          }, 100)
        })
      },
      content (handle, type) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              id: '12345',
              source: 'contentful',
              type: 'content',
              title: 'Mock Response',
              description: 'This is a mock content response',
              sections: defaultContent.contentful,
              tags: [],
              fields: {}
            })
          }, 100)
        })
      },
      collection (handle) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              collection: mockProductCollection
            })
          })
        })
      }
    }
  }
}