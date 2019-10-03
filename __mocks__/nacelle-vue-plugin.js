import { defaultProduct } from '../config/defaultObjects'

export default { 
  install (Vue) {
    Vue.prototype.$nacelle = {
      products (handles) {
        console.log(handles)
        const products = handles.map(handle => defaultProduct)
        return Promise.resolve(products)
      }
    }
  }
}