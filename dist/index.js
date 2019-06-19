// THIS FILE IS AUTOMATICALLY GENERATED IN:
//
//   build/update-file-index.js
//
// YOU SHOULD NEVER UPDATE THIS FILE DIRECTLY

import AddToCartButton from './components/AddToCartButton.vue'
import ProductPrice from './components/ProductPrice.vue'
import ProductTitle from './components/ProductTitle.vue'
import Spinner from './components/Spinner.vue'

// Export components individually
export { AddToCartButton, ProductPrice, ProductTitle, Spinner }

// What should happen if the user installs the library as a plugin
function install(Vue) {
  Vue.component('AddToCartButton', AddToCartButton)
  Vue.component('ProductPrice', ProductPrice)
  Vue.component('ProductTitle', ProductTitle)
  Vue.component('Spinner', Spinner)
}

// Export the library as a plugin
export default { install: install }