<template>
  <div>
    {{priceWithCurrency}}
    <span v-if="showCurrencyCode">{{currencyCode}}</span>
  </div>
</template>

<script>
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
    priceWithCurrency() {
      let currencySymbol = "";
      if (this.currencyCode == "USD") {
        currencySymbol = "$";
      }
      return `${currencySymbol}${this.price}`;
    }
  }
};
</script>

<style>
</style>
