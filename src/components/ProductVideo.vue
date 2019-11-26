<template>
  <div class="product-video nacelle">
    <video
      ref="product-video"
      :controls="showControls"
      :loop="loop"
      :muted="muted"
      :autoplay="autoplay"
    >
      <source v-if="formatMp4" :src="source" type="video/mp4" />
      <source v-if="formatWebm" :src="source" type="video/webm" />
      <source v-if="formatOgg" :src="source" type="video/ogg" />
      <source v-if="formatAvi" :src="source" type="video/avi" />
      <p>Your browser doesn't support the HTML5 video tag.</p>
    </video>
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: String
    },
    showControls: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    muted() {
      if (this.autoplay == true) {
        return true
      } else {
        return false
      }
    },
    sourceExtension() {
      return this.source
        .split('?')[0]
        .split('.')
        .reverse()[0]
    },
    formatMp4() {
      return this.sourceExtension === 'mp4'
    },
    formatWebm() {
      return this.sourceExtension === 'webm'
    },
    formatOgg() {
      return this.sourceExtension === 'ogg'
    },
    formatAvi() {
      return this.sourceExtension === 'avi'
    }
  }
}
</script>

<style></style>
