<template>
  <div class="nacelle collection-data-load">
    <slot v-if="collection" :collection="collection" />
  </div>
</template>

<script>
export default {
  props: {
    handle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      collection: undefined
    }
  },
  created () {
    if (process.browser) {
      this.$nacelle
        .collection(this.handle)
        .then((result) => {
          if (result) {
            this.collection = result
          }
        })
    }
  }
}
</script>

<style>

</style>