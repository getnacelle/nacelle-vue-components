import { mount } from '@vue/test-utils'
import MixinTestBench from '@/components/MixinTestBench.vue'
// import ProductTitle from '@/components/ProductTitle'
import productMetafields from '../../src/mixins/productMetafields'

describe('productMetafields.js', () => {
  const metafields = [{
    'id': null,
    'namespace': 'subscriptions',
    'key': 'charge_interval_frequency',
    'value': '30',
    '__typename': 'ProductMetafield'
  }, {
    'id': null,
    'namespace': 'subscriptions',
    'key': 'order_interval_frequency',
    'value': '30',
    '__typename': 'ProductMetafield'
  }, {
    'id': null,
    'namespace': 'subscriptions',
    'key': 'order_interval_unit',
    'value': 'day',
    '__typename': 'ProductMetafield'
  }]

  it('creates metafieldObj computed property', () => {
    const wrapper = mount(MixinTestBench, {
      mixins: [productMetafields],
      propsData: {
        product: {
          metafields
        }
      }
    })

    expect(wrapper.vm.metafieldsObj).toEqual({
      subscriptions: {
        'order_interval_unit': 'day',
        'order_interval_frequency': '30',
        'charge_interval_frequency': '30'
      }
    })
  })

  it('gets the metafield value', () => {
    const wrapper = mount(MixinTestBench, {
      mixins: [productMetafields],
      propsData: {
        product: {
          metafields
        }
      }
    })

    const order_interval_unit = wrapper.vm
      .getMetafield('subscriptions', 'order_interval_unit')

    expect(order_interval_unit).toEqual('day')
  })
})