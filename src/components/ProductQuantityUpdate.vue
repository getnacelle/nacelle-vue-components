<template>
  <div class="quantity-updater no-select">
    <div class="quantity-value">{{quantity}}</div>
    <div class="switches">
      <div class="increment switch" @click="incrementLineItem(variantId)">
        <span>+</span>
      </div>
      <div class="decrement switch" @click="decrementLineItem(variantId)">
        <span>-</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    variantId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('cart', ['lineItems']),
    quantityInCart() {
      let vm = this
      let index = vm.lineItems.findIndex(item => {
        return item.variant.id == vm.variantId
      })
      if (index != -1) {
        return vm.lineItems[index].quantity
      } else {
        return 0
      }
    },
    quantity() {
      if (this.quantityInCart == 0) {
        return 1
      } else {
        return this.quantityInCart
      }
    }
  },
  methods: {
    ...mapActions('cart', ['incrementLineItem', 'decrementLineItem'])
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
