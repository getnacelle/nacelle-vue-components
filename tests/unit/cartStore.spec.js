import store from '../../src/store/store'
import localforage from 'localforage'
import uuid from 'uuidv4'

describe('Cart Store', () => {
  it('adds a line item to the line items array', async () => {
    store.dispatch('cart/addLineItem', {
      image: {
        source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
      },
      title: 'Gray T-Shirt',
      productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
      handle: 'gray-t-shirt',
      quantity: 1,
      variant: {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
      }
    })
    expect(store.state.cart.lineItems.length).toEqual(1)
    expect(store.state.cart.lineItems[0].id).toContain('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==')
    expect(uuid.is(store.state.cart.lineItems[0].id.split('::')[1])).toBeTruthy()
  })

  it('removes a line item from the line items array', async () => {
    store.state.cart.lineItems = [
      {
        id: `Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==::${uuid()}`,
        image: {
          source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
        quantity: 1,
        variant: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
        }
      }
    ]
    store.dispatch(
      'cart/removeLineItem',
      store.state.cart.lineItems[0].id
    )
    expect(store.state.cart.lineItems).toEqual([])
  })

  it('increments a line item', async () => {
    store.state.cart.lineItems = [
      {
        id: `Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==::${uuid()}`,
        image: {
          source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
        quantity: 1,
        variant: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
        }
      }
    ]
    store.dispatch(
      'cart/incrementLineItem',
      store.state.cart.lineItems[0].id
    )
    expect(store.state.cart.lineItems[0].quantity).toEqual(2)
  })

  it('decrements a line item', async () => {
    store.state.cart.lineItems = [
      {
        id: `Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==::${uuid()}`,
        image: {
          source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
        quantity: 2,
        variant: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
        }
      }
    ]
    store.dispatch(
      'cart/decrementLineItem',
      store.state.cart.lineItems[0].id
    )
    expect(store.state.cart.lineItems[0].quantity).toEqual(1)
  })

  it('sets the line items array', async () => {
    const lineUuid = uuid()
    store.commit('cart/setLineItems', [
      {
        id: `Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==::${lineUuid}`,
        image: {
          source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
        quantity: 2,
        variant: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
        }
      }
    ])
    expect(store.state.cart.lineItems).toEqual([
      {
        id: `Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==::${lineUuid}`,
        image: {
          source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
        quantity: 2,
        variant: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
        }
      }
    ])
  })

  it('calculates the cart value', async () => {
    store.commit('cart/setLineItems', [
      {
        id: `Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==::${uuid()}`,
        image: {
          source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
        quantity: 2,
        variant: {
          price: '40.00',
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
        }
      }
    ])
    expect(store.getters['cart/cartSubtotal']).toEqual(80)
  })

  it('returns true if the free shipping threshold has been reached', async () => {
    store.commit('cart/setFreeShippingThreshold', 100)
    store.commit('cart/setLineItems', [
      {
        id: `Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==::${uuid()}`,
        image: {
          source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',

        quantity: 3,
        variant: {
          price: '40.00',
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
        }
      }
    ])
    expect(store.getters['cart/freeShippingThresholdPassed']).toEqual(true)
  })
  it('returns the amount needed to hit the shipping threshold', async () => {
    store.commit('cart/setFreeShippingThreshold', 100)
    store.commit('cart/setLineItems', [
      {
        id: `Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==::${uuid()}`,
        image: {
          source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',

        quantity: 2,
        variant: {
          price: '40.00',
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
        }
      }
    ])
    expect(store.getters['cart/amountUntilFreeShipping']).toEqual(20)
  })

  it('returns an array of line items with the properties needed for checkout', async () => {
    const uId = uuid()

    store.commit('cart/setLineItems', [
      {
        id: `Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==::${uId}`,
        image: {
          source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
        price: '40.00',
        quantity: 2,
        variant: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
        }
      }
    ])
    expect(store.getters['cart/checkoutLineItems']).toEqual([
      {
        cartItemId: `Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==::${uId}`,
        variantId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==',
        quantity: 2
      }
    ])
  })

  it('sets a checkoutId', async () => {
    await localforage.clear()
    await store.commit('cart/setCheckoutId', '1234567899')
    expect(store.state.cart.checkoutId).toEqual('1234567899')
  })

  it('gets a checkoutId', async () => {
    await localforage.setItem('checkout-id', '1234567778')
    await store.dispatch('cart/getCheckoutId')
    expect(store.state.cart.checkoutId).toEqual('1234567778')
  })

  it('saves an array of line items', async () => {
    const lineUuid = uuid()
    store.state.cart.lineItems = [
      {
        id: `Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==::${lineUuid}`,
        image: {
          source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
        quantity: 2,
        variant: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
        }
      }
    ]
    await store.dispatch('cart/saveLineItems')
    expect(await localforage.getItem('line-items')).toEqual([
      {
        id: `Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==::${lineUuid}`,
        image: {
          source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
        quantity: 2,
        variant: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
        }
      }
    ])
  })
})
