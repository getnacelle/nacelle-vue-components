import { shallowMount, createLocalVue } from '@vue/test-utils'
import ProductImage from '@/components/ProductImage'
import Vuex from 'vuex'

import store from '../../src/store/store'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('ProductImage/vue', () => {
  it('renders an image', async () => {
    const wrapper = shallowMount(ProductImage, {
      store,
      propsData: {
        source:
          'https://www.sparkawards.com/wp-content/uploads/2011/05/Product_Lg_Type-1024x791.jpg',
        alt: 'chair'
      },
      data: function() {
        return {
          visible: true
        }
      }
    })
    expect(wrapper.html()).toBe(
      '<div class="product-image nacelle"><picture><!----> <source srcset="https://www.sparkawards.com/wp-content/uploads/2011/05/Product_Lg_Type-1024x791.jpg" type="image/webp"> <source srcset="https://www.sparkawards.com/wp-content/uploads/2011/05/Product_Lg_Type-1024x791.jpg" type="image/jpeg"> <img src="https://www.sparkawards.com/wp-content/uploads/2011/05/Product_Lg_Type-1024x791.jpg" alt="chair" class=""></picture></div>'
    )
  })
})
