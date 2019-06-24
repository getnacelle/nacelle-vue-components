<template>
  <component :is="element">{{title}}</component>
</template>

<script>
import { mapState } from 'vuex'
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
  },
  computed: {
    ...mapState('test', ['hi'])
  }
}
</script>

<style>
</style>
