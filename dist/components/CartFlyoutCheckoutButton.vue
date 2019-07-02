<template>
  <div
    class="button is-primary checkout-button"
    :class="{'is-loading': loading}"
    @click="checkout"
  >{{checkoutText}}</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    checkoutText: {
      type: String,
      default: 'Checkout'
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions('cart', ['processCheckout']),
    checkout() {
      this.loading = true
      this.processCheckout()
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout-button {
  border-radius: 0;
  width: 100%;
  padding: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12pt;
  letter-spacing: 1px;
}
</style>
