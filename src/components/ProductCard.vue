<template>
  <div class="product-card">
    <router-link :to="`${pathFragment}${product.handle}`">
      <product-image :source="mediaSrc" />
    </router-link>
    <div class="product-card-details">
      <router-link :to="`${pathFragment}${product.handle}`">
        <product-title :title="product.title" />
      </router-link>
      <product-price :price="product.priceRange.max" />
    </div>
    <div v-if="product && product.id" class="product-card-actions">
      <product-quantity-update
        :product="product"
        :variant="currentVariant"
        v-if="showQuantityUpdate == true"
        :allOptionsSelected="allOptionsSelected"
        v-on:needsOptionsSelected="modalOpen = true"
        v-on:showVariantsFromCart="cartItemsModalOpen = true"
      />
      <product-add-to-cart-button
        :product="product"
        :variant="currentVariant"
        v-if="showAddToCart == true"
        :allOptionsSelected="allOptionsSelected"
        :confirmedSelection="confirmedSelection"
        v-on:needsOptionsSelected="modalOpen = true"
      ></product-add-to-cart-button>
      <interface-modal
        :modalOpen="modalOpen"
        v-on:closeModal="modalOpen = false"
        v-on:confirmedSelection="confirmedSelection = true"
      >
        <h3 class="modal-title">Choose Your Options</h3>
        <product-options
          :options="product.options"
          v-on:allOptionsSelected="setOptionsSelection"
          v-on:clearedOptions="allOptionsSelected = false, confirmedSelection = false"
        />
      </interface-modal>
      <interface-modal :modalOpen="cartItemsModalOpen" v-on:closeModal="cartItemsModalOpen = false">
        <h3 class="modal-title">Remove a Variant</h3>
        <cart-flyout-item v-for="item in productLineItems" :item="item" :key="item.variant.id" />
      </interface-modal>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import ProductImage from './ProductImage'
import ProductTitle from './ProductTitle'
import ProductPrice from './ProductPrice'
import ProductQuantityUpdate from './ProductQuantityUpdate'
import ProductAddToCartButton from './ProductAddToCartButton'
import InterfaceModal from './InterfaceModal'
import ProductOptions from './ProductOptions'
import CartFlyoutItem from './CartFlyoutItem'
export default {
  components: {
    ProductImage,
    ProductTitle,
    ProductPrice,
    ProductQuantityUpdate,
    ProductAddToCartButton,
    InterfaceModal,
    ProductOptions,
    CartFlyoutItem
  },
  props: {
    pathFragment: {
      type: String,
      default: '/products/'
    },
    product: {
      type: Object,
      default: () => {
        return {
          priceRange: {
            min: '0.0',
            max: '0.00'
          },
          title: null,
          featuredMedia: {
            src: undefined
          },
          id: null,
          handle: '',
          variants: []
        }
      }
    },
    variant: {
      type: Object
    },
    showQuantityUpdate: {
      type: Boolean,
      default: true
    },
    showAddToCart: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      needsOptionsSelected: false,
      modalOpen: false,
      cartItemsModalOpen: false,
      allOptionsSelected: false,
      confirmedSelection: false,
      optionsSelection: null
    }
  },
  computed: {
    ...mapState('cart', ['lineItems']),
    currentVariant() {
      if (this.variant === null) {
        if (this.product.variants && this.product.variants.length == 1) {
          return this.product.variants[0]
        }

        return undefined
      }

      return this.variant
    },
    currentVariantId() {
      if (this.currentVariant && this.currentVariant.id) {
        return this.currentVariant.id
      }

      return undefined
    },
    mediaSrc() {
      if (
        this.product &&
        this.product.featuredMedia &&
        this.product.featuredMedia.src
      ) {
        return this.product.featuredMedia.src
      }

      return undefined
    },
    cartProduct() {
      return {
        image: this.product.featuredMedia,
        title: this.product.title,
        productId: this.product.id,
        price: this.currentPrice,
        handle: this.product.handle,
        variant: this.currentVariant
      }
    },
    productLineItems() {
      let vm = this
      return this.lineItems.filter(item => {
        return item.productId == vm.product.id
      })
    }
  },
  watch: {
    optionsSelection() {
      this.$emit('selectedOptions', this.optionsSelection)
    },
    productLineItems(val) {
      if (val.length == 0) {
        this.cartItemsModalOpen = false
      }
    }
  },
  methods: {
    ...mapMutations('cart', ['showCart']),
    setOptionsSelection(options) {
      this.optionsSelection = options
      this.allOptionsSelected = true
    }
  }
}
</script>

<style lang="scss" scoped>
.product-card-details,
.product-card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-card-details /deep/ a {
  flex-basis: 80%;
}
.handler {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>

