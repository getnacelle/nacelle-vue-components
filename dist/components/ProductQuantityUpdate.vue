<template>
  <div class="quantity-updater no-select">
    <div class="quantity-value">{{quantityInCart}}</div>
    <div class="switches">
      <div class="increment switch" @click="increment">
        <span>+</span>
      </div>
      <div class="decrement switch" @click="decrement">
        <span>-</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    image: { type: Object, required: true },
    title: { type: String, required: true },
    variant: { type: Object, required: true },
    productId: { type: String, required: true },
    handle: { type: String, required: true }
  },
  computed: {
    ...mapState('cart', ['lineItems']),
    quantityInCart() {
      const item = this.lineItems.find(item => {
        return item.variant.id === this.variantId
      })

      if (item) {
        return item.quantity
      }

      return 0
    },
    variantId() {
      if (
        this.cartProduct &&
        this.cartProduct.variant &&
        this.cartProduct.variant.id
      ) {
        return this.cartProduct.variant.id
      }

      return null
    },
    cartProduct() {
      return {
        image: this.image,
        title: this.title,
        variant: this.variant,
        productId: this.productId,
        handle: this.handle
      }
    }
  },
  methods: {
    ...mapActions('cart', [
      'addLineItem',
      'removeLineItem',
      'incrementLineItem',
      'decrementLineItem'
    ]),
    increment() {
      if (this.quantityInCart === 0) {
        this.addLineItem({
          ...this.cartProduct,
          quantity: 1
        })
      } else {
        this.incrementLineItem(this.variantId)
      }
    },
    decrement() {
      if (this.quantityInCart === 1) {
        this.removeLineItem(this.variantId)
      } else {
        this.decrementLineItem(this.variantId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.quantity-updater {
  display: flex;
  line-height: 1;
  width: 5rem;
  height: 2.25rem;
  text-align: center;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  // margin-right: 1rem;
  .quantity-value {
    width: 3rem;
  }
  .switches {
    width: 2rem;
    font-size: 14pt;
    border-left: 1px solid #dbdbdb;
  }
  .switch {
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;
    &:first-child {
      border-bottom: 1px solid #dbdbdb;
    }
    &:hover {
      background: #f5f5f5;
    }
  }
}
</style>
