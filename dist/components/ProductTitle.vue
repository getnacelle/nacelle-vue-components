<template>
  <component :is="element">{{title}}</component>
</template>

<script>
export default {
  props: {
    element: {
      type: String,
      default: 'h3'
    },
    title: {
      type: String,
      default: 'Product Title'
    }
  }
}
</script>

<style>
</style>
