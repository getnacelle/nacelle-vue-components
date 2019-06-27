<template>
  <div class="description" v-html="description"></div>
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

<style lang='scss' scoped>
.description {
  margin-bottom: 1rem;
}
</style>
