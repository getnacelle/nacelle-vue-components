<template>
  <button class="button" @click="removeLineItem(variantId)">Remove</button>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    variantId: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions('cart', ['removeLineItem'])
  }
}
</script>

<style>
</style>
