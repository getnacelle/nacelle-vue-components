import store from '../../src/store/store'

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
    expect(store.state.cart.lineItems).toEqual([
      {
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
    ])
  })

  it('removes a line item from the line items array', async () => {
    store.state.cart.lineItems = [
      {
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
      'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
    )
    expect(store.state.cart.lineItems).toEqual([])
  })

  it('increments a line item', async () => {
    store.state.cart.lineItems = [
      {
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
      'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
    )
    expect(store.state.cart.lineItems).toEqual([
      {
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

  it('decrements a line item', async () => {
    store.state.cart.lineItems = [
      {
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
      'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
    )
    expect(store.state.cart.lineItems).toEqual([
      {
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
    ])
  })

  it('sets the line items array', async () => {
    store.commit('cart/setLineItems', [
      {
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
    expect(store.getters['cart/cartSubtotal']).toEqual(80)
  })

  it('returns true if the free shipping threshold has been reached', async () => {
    store.commit('cart/setFreeShippingThreshold', 100)
    store.commit('cart/setLineItems', [
      {
        image: {
          source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
        price: '40.00',
        quantity: 3,
        variant: {
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
    expect(store.getters['cart/amountUntilFreeShipping']).toEqual(true)
  })
})
