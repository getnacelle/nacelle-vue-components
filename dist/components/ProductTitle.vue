<template>
  <component class="title" :is="element">{{title}}</component>
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

<style lang="scss" scoped>
.title {
  font-size: 22pt;
  font-weight: 600;
  margin-bottom: 1rem;
}
</style>
