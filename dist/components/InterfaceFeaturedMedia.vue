<template>
  <div class="featured-media nacelle">
    <figure v-if="source && type.includes('image')">
      <img :src="media.src">
    </figure>
    <video v-if="source && type.includes('video')">
      <source :src="media.src" :type="type" />
    </video>
  </div>
</template>

<script>
export default {
  props: {
    media: {
      type: Object,
      default: () => {}
    },
    width: {
      type: Number
    }
  },
  computed: {
    source() {
      if (
        this.media &&
        this.media.src
      ) {
        return this.media.src
      }

      return null
    },
    type() {
      if (
        this.media &&
        this.media.type
      ) {
        return this.media.type
      }

      return 'image'
    }
  }
}
</script>

<style>

</style>
