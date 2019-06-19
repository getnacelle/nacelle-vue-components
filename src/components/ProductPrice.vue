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
      let currencyCode;
      if (this.showCurrencyCode) {
        currencyCode = this.currencyCode;
      } else {
        currencyCode = "";
      }
      let priceObject = Dinero({
        amount: this.price,
        currency: this.currencyCode
      });
      if (priceObject.hasCents()) {
        return `${priceObject.toFormat("$0,0.00")} ${currencyCode}`;
      } else {
        return `${priceObject.toFormat("$0,0")} ${currencyCode}`;
      }
    }
  }
};
</script>

<style>
</style>
