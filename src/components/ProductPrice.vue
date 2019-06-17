<template>
  <div>{{priceWithCurrency}}</div>
</template>

<script>
export default {
  props: {
    price: Number,
    currencyCode: {
      type: String,
      default: "USD"
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
