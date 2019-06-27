<template>
  <div class="media-select-view columns is-multiline" :style="{width: `${featuredImageSize}px`}">
    <div class="media-viewer column is-12" :style="{height: `${featuredImageSize}px`}">
      <transition name="fade" mode="out-in">
        <component
          :is="mediaComponent"
          v-if="selectedMedia"
          :source="selectedMedia.source"
          :key="selectedMedia.source"
          :width="featuredImageSize"
        />
      </transition>
    </div>
    <div class="media-select column is-12">
      <div class="columns is-mobile">
        <product-image
          class="column is-one-fifth media-item"
          v-for="item in media"
          :key="item.id"
          @click.native="setSelected(item)"
          :width="thumbnailImageSize"
          :source="item.source"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductImage from './ProductImage'
import ProductVideo from './ProductVideo'
export default {
  components: {
    ProductImage,
    ProductVideo
  },
  props: {
    media: {
      type: Array,
      required: true
    },
    featuredMedia: {
      type: Object,
      required: true
    },
    featuredImageSize: {
      type: Number,
      default: 500
    },
    thumbnailImageSize: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      selectedMedia: this.featuredMedia
    }
  },
  computed: {
    mediaComponent() {
      if (this.selectedMedia) {
        if (this.selectedMedia.type == 'image') {
          return 'ProductImage'
        } else if (this.selectedMedia.type == 'video') {
          return 'ProductVideo'
        }
      }
    }
  },
  methods: {
    setSelected(item) {
      this.selectedMedia = item
      console.log('selected')
    }
  }
}
</script>

<style lang="scss" scoped>
.media-viewer {
  margin-bottom: 2rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
