<template>
  <div>{{productPrice}}</div>
</template>

<script>
import Dinero from "dinero.js";
export default {
  props: {
    price: Number,
    currencyCode: {
      type: String,
      default: "USD"
    },
    showCurrencyCode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    productPrice() {
      let priceObject = Dinero({
        amount: this.price,
        currency: this.currencyCode
      });
      if (priceObject.hasCents()) {
        return priceObject.toFormat("$0,0.00");
      } else {
        return priceObject.toFormat("$0,0");
      }
    }
  }
};
</script>

<style>
</style>
