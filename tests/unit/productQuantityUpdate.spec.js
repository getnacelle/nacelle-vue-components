import store from '../../src/store/store'
import { mount, shallowMount } from '@vue/test-utils'
import QuantitySelector from '@/components/QuantitySelector'
import { defaultLineItem } from '../../config/defaultObjects.js'

describe('QuantitySelector.vue', () => {
  // it('if quantity is 0 it adds product to cart', async () => {
  //   const wrapper = shallowMount(ProductQuantityUpdate, {
  //     store,
  //     propsData: {
  //       product: defaultLineItem,
  //       variant: defaultLineItem.variant
  //     }
  //   })
  //   const input = wrapper.find('.increment')

  //   input.trigger('click')

  //   expect(store.state.cart.lineItems).toEqual([
  //     {
  //       ...defaultLineItem,
  //       quantity: 1
  //     }
  //   ])
  // })

  // it('increments the product quantity', async () => {
  //   const wrapper = shallowMount(ProductQuantityUpdate, {
  //     store,
  //     propsData: {
  //       product: defaultLineItem,
  //       variant: defaultLineItem.variant
  //     }
  //   })
  //   const input = wrapper.find('.increment')

  //   store.state.cart.lineItems = [
  //     {
  //       ...defaultLineItem,
  //       quantity: 1
  //     }
  //   ]
  //   input.trigger('click')

  //   expect(store.state.cart.lineItems).toEqual([
  //     {
  //       ...defaultLineItem,
  //       quantity: 2
  //     }
  //   ])
  // })

  it('decrements the product quantity', async () => {
    const WrapperComp = {
      template: `
      <quantity-selector
        :quantity.sync="quantity"
      />
      `,
      components: {
        QuantitySelector
      },
      data() {
        return {
          quantity: 2
        }
      }
    }
    const wrapper = mount(WrapperComp).find(QuantitySelector)

    wrapper.vm.decrement()

    const input = wrapper.find('.quantity-input')
    expect(input.element.value).toEqual('1')
    expect(wrapper.props('quantity')).toEqual(1)
  })

  it('if quantity equals 1 decrement removes item, if item specified in props', async () => {
    store.dispatch('cart/addLineItem', {
      ...defaultLineItem,
      quantity: 1
    })

    const WrapperComp = {
      template: `
      <quantity-selector
        :quantity="item.quantity"
        :item="item"
      />
      `,
      components: {
        QuantitySelector
      },
      data() {
        return {
          item: store.state.cart.lineItems[0]
        }
      }
    }
    const wrapper = mount(WrapperComp, {
      store
    }).find(QuantitySelector)

    wrapper.vm.decrement()

    expect(store.state.cart.lineItems.length).toEqual(0)
  })
})
