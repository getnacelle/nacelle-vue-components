<template>
  <div class="product-card nacelle">
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
      <quantity-selector :quantity.sync="quantity" />
      <product-add-to-cart-button
        v-if="showAddToCart == true"
        :product="product"
        :variant="currentVariant"
        :allOptionsSelected="allOptionsSelected"
        :confirmedSelection="confirmedSelection"
        @click.native="handleAddToCartClick"
        :onlyOneOption="onlyOneOption"
        :quantity="quantity"
      ></product-add-to-cart-button>
      <interface-modal
        :modalOpen="optionsModalVisible"
        v-on:closeModal="optionsModalVisible = false"
      >
        <h3 class="modal-title">Choose Your Options</h3>
        <product-options
          :options="allOptions"
          v-on:selectedOptionsSet="setSelected"
          v-on:confirmedSelection="confirmedSelection = true, optionsModalVisible = false"
          :onlyOneOption="onlyOneOption"
          :variant="currentVariant"
          :variants="product.variants"
        />
      </interface-modal>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import ProductImage from './ProductImage'
import ProductTitle from './ProductTitle'
import ProductPrice from './ProductPrice'
import QuantitySelector from './QuantitySelector'
import ProductAddToCartButton from './ProductAddToCartButton'
import InterfaceModal from './InterfaceModal'
import ProductOptions from './ProductOptions'
import CartFlyoutItem from './CartFlyoutItem'
import allOptionsSelected from '../mixins/allOptionsSelected'
import availableOptions from '../mixins/availableOptions'

export default {
  components: {
    ProductImage,
    ProductTitle,
    ProductPrice,
    QuantitySelector,
    ProductAddToCartButton,
    InterfaceModal,
    ProductOptions,
    CartFlyoutItem
  },
  mixins: [allOptionsSelected, availableOptions],
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
      optionsModalVisible: false,
      confirmedSelection: false,
      quantity: 0
    }
  },
  watch: {
    quantityTotal() {
      this.confirmedSelection = false
    }
  },
  computed: {
    ...mapState('cart', ['lineItems']),
    ...mapGetters('cart', ['quantityTotal']),

    currentVariant() {
      if (this.product.variants && this.product.variants.length == 1) {
        return this.product.variants[0]
      } else {
        return this.selectedVariant
      }
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
      const vm = this
      return this.lineItems.filter(item => {
        return item.productId == vm.product.id
      })
    },
    onlyOneOption() {
      if (
        this.allOptions &&
        this.allOptions.length == 1 &&
        this.allOptions[0].values.length == 1
      ) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    ...mapMutations('cart', ['showCart']),

    handleAddToCartClick() {
      if (!this.allOptionsSelected) {
        this.optionsModalVisible = true
      }
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
  min-width: 300px;
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
