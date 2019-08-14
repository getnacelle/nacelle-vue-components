<template>
  <div
    class="button is-primary checkout-button"
    :class="{'is-loading': loading}"
    @click="checkout"
  >{{checkoutText}}</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
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
  computed: {
    ...mapGetters('cart', ['checkoutLineItems'])
  },
  methods: {
    ...mapActions('cart', ['processCheckout', 'getCheckoutIdForBackend']),
    async checkout() {
      let vm = this
      this.loading = true
      let processCheckoutObject = await this.$apollo
        .mutate({
          mutation: gql`
            mutation($input: CheckoutInput) {
              processCheckout(input: $input) {
                id
                url
                completed
              }
            }
          `,
          variables: {
            input: {
              cartItems: vm.checkoutLineItems,
              checkoutId: vm.getCheckoutIdForBackend()
            }
          }
        })
        .then(data => {
          return data.data.processCheckout
        })
        .catch(err => {
          console.log(err)
          commit('setCartError')
        })
      this.processCheckout(processCheckoutObject)
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
