<template>
  <div
    class="button is-primary checkout-button nacelle"
    :class="{'is-loading': loading}"
    @click="checkout"
  >{{checkoutText}}</div>
</template>

<script>
import gql from 'graphql-tag'
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
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
    ...mapGetters('cart', ['checkoutLineItems', 'checkoutIdForBackend'])
  },
  methods: {
    ...mapMutations('cart', ['setCartError']),
    ...mapActions('cart', ['processCheckout']),
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
              checkoutId: vm.checkoutIdForBackend
            }
          }
        })
        .then(data => {
          return data.data.processCheckout
        })
        .catch(err => {
          console.log(err)
          vm.setCartError()
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
