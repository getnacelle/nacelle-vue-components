<template>
  <button class="button nacelle" @click="removeLineItem(variantId)">
    <slot>Remove</slot>
  </button>
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
