<template>
  <div v-html="description"></div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: '<p>This is the description</p>'
    }
  }
}
</script>

<style>
</style>
