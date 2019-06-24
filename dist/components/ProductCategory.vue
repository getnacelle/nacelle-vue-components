<template>
  <div>
    <p>{{category}}</p>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      default: 'Product Category'
    }
  }
}
</script>

<style>
</style>
