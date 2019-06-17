<template>
  <div>
    <button @click="addIfAvailable(variant)">Add to Cart!</button>
    <!-- <button
      class="button"
      :class="{'out-of-stock': !variant.availableForSale}"
      @click="addIfAvailable(variant)"
    >
      <span v-if="variant.availableForSale && !productInCart">
        <span class="plus" v-if="showPlus">+</span>Add to Cart
      </span>

      <span v-if="!variant.availableForSale">Notify Me</span>
      <span v-if="productInCart">Added!</span>
    </button>-->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  props: {
    image: { type: String, required: true },
    title: { type: String, required: true },
    variant: { type: Object, required: true },
    quantity: { type: Number, default: 1 },
    productId: { type: String, required: true },
    handle: { type: String, required: true }
  },
  methods: {
    ...mapActions("cart", ["addItem"]),
    // ...mapMutations("cart", ["showCart"]),
    addIfAvailable(variant) {
      console.log(variant);
      //   if (variant.availableForSale) {
      //     let sku = variant.sku || null;
      //     let lineItem = {
      //       title: this.title,
      //       quantity: this.quantity,
      //       productId: this.productId,
      //       variantId: variant.id,
      //       image: this.image,
      //       price: variant.price,
      //       handle: this.handle,
      //       sku: sku,
      //       variantTitle: variant.title
      //     };
      this.addItem(product);
      //   }
      //   if (this.productInCart) {
      //     this.showCart();
      //   }
    }
  },
  computed: {
    // ...mapState("cart", ["lineItems"]),
    // productInCart() {
    //   let id = this.variant.id;
    //   let isInArray = cartItem => {
    //     return cartItem.variantId === id;
    //   };
    //   if (this.lineItems && this.lineItems.find(isInArray)) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
.button {
  flex-grow: 5;
  width: 100%;
  transition: opacity 0.2s ease;
  opacity: 1;
  background: #ddd2b1;
  border: none;
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 700;
  line-height: 0px;
  font-size: 14px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #ffffff;
  outline: none;
  padding: 2rem 4rem;
  @media screen and (max-width: 786px) {
    padding: 2rem 2.5rem;
  }
  border-radius: 0;
  .plus {
    margin-right: 0.2rem;
  }
}
</style>
