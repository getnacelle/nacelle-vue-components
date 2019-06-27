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

<style lang="scss" scoped>
p {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 10pt;
  letter-spacing: 0.5px;
  color: gray;
  margin-bottom: 1rem;
}
</style>
