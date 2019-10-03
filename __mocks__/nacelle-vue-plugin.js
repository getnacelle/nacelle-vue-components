import { defaultProduct } from '../config/defaultObjects'

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
      }
    }
  }
}