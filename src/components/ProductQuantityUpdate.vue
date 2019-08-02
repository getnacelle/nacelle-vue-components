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
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    product: {
      type: Object
    },
    variant: {
      type: Object
    }
  },
  computed: {
    ...mapState('cart', ['lineItems']),
    ...mapState('product', ['selectedVariant']),
    ...mapGetters('product', ['allOptionsSelected']),
    quantityInCart() {
      if (this.$parent.$options._componentTag == 'product-card') {
        const items = this.lineItems.filter(item => {
          return item.productId === this.product.id
        })
        if (items) {
          return items.reduce((acc, item) => {
            return acc + item.quantity
          }, 0)
        } else {
          return 0
        }
      } else if (this.variant != null) {
        const item = this.lineItems.find(item => {
          return item.variant.id === this.variant.id
        })
        if (item) {
          return item.quantity
        } else {
          return 0
        }
      } else {
        return 0
      }
    },
    multipleVariantsInCart() {
      const items = this.lineItems.filter(item => {
        return item.productId === this.product.id
      })
      if (items.length > 1) {
        return true
      } else {
        return false
      }
    },
    cartProduct() {
      return {
        image: this.product.featuredMedia,
        title: this.product.title,
        variant: this.variant,
        productId: this.product.id,
        handle: this.product.handle
      }
    },
    allSelected() {
      if (
        this.product.options &&
        this.product.options.length == 1 &&
        this.product.options[0].values.length == 1
      ) {
        return true
      } else if (this.allOptionsSelected) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations('cart', ['showCart']),
    ...mapMutations('product', ['setProduct']),
    ...mapMutations('product', ['showOptionsModal']),
    ...mapMutations('product', ['showRemoveItemsModal']),
    ...mapActions('cart', [
      'addLineItem',
      'removeLineItem',
      'incrementLineItem',
      'decrementLineItem'
    ]),
    increment() {
      if (
        this.allSelected ||
        this.$parent.$options._componentTag == 'cart-flyout-item'
      ) {
        if (this.quantityInCart === 0) {
          this.addLineItem({
            ...this.cartProduct,
            quantity: 1
          })
        } else {
          this.incrementLineItem(this.variant.id)
        }
      } else {
        this.setProduct(this.product)
        this.showOptionsModal()
      }
    },
    decrement() {
      this.setProduct(this.product)
      if (
        this.multipleVariantsInCart &&
        this.$parent.$options._componentTag == 'product-card'
      ) {
        this.showRemoveItemsModal()
      } else {
        if (this.quantityInCart === 1) {
          this.removeLineItem(this.variant.id)
        } else {
          this.decrementLineItem(this.variant.id)
        }
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
