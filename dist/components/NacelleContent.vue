<template>
  <div class="nacelle content-data-load">
    <slot v-if="content" :content="content" />
  </div>
</template>

<script>
export default {
  props: {
    handle: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'content'
    },
  },
  data () {
    return {
      content: undefined
    }
  },
  created () {
    if (process.browser) {
      this.$nacelle
        .content(this.handle, this.type)
        .then((result) => {
          if (result) {
            this.content = result
          }
        })
    }
  }
}
</script>

<style>

</style>