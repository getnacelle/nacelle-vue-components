<template>
  <router-link :to="`${pathFragment}${item.handle}`">
    <div class="columns is-marginless is-mobile autocomplete-item nacelle is-vcentered">
      <product-image :source="item.featuredMedia.thumbnailSrc" :alt="item.title" />
      <h3 class="column is-5">{{item.title}}</h3>
      <product-price class="column is-3 is-marginless" :price="item.variants[0].price" />
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    pathFragment: {
      type: String,
      default: '/products/'
    }
  }
}
</script>
