<template>
  <section class="sbs">
    <div class="columns" :class="columnClasses">
      <div class="column is-half sbs-image">
        <img :src="imageUrl" alt="" />
      </div>
      <div
        class="column is-half sbs-copy"
        :style="backgroundColor ? `background-color: ${backgroundColor}` : null "
      >
        <div class="has-text-centered">
          <h3 class="title">
            {{ title }}
          </h3>
          <div class="content" v-html="copy" />
          <p v-if="ctaText.length > 0">
            <slot name="cta">
              <cta-button :to="ctaUrl" @clicked="ctaHandler">
                {{ ctaText }}
              </cta-button>
            </slot>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CtaButton from './CtaButton'

export default {
  components: {
    CtaButton
  },
  props: {
    backgroundColor: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    copy: {
      type: String,
      default: ''
    },
    ctaText: {
      type: String,
      default: ''
    },
    ctaUrl: {
      type: String,
      default: ''
    },
    ctaHandler: {
      type: Function,
      default: () => {}
    },
    reverseDesktop: {
      type: Boolean,
      default: false
    },
    reverseMobile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    columnClasses() {
      const desktopReverse = this.reverseDesktop ? 'is-column-reverse' : ''
      const mobileReverse = this.reverseMobile ? 'is-mobile-column-reverse' : ''

      return `${desktopReverse} ${mobileReverse}`
    }
  }
}
</script>

<style lang="scss" scoped>
.sbs .columns {
  min-height: 400px;
}

.columns.is-column-reverse {
  @media screen and (min-width: 769px) {
    flex-direction: row-reverse;
  }
}

.columns.is-mobile-column-reverse {
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
  }
}

.sbs-image {
  @media screen and (min-width: 769px) {
    position: relative;
    padding: 0;

    img {
      width: 100%;
    }
  }
}

.sbs-copy {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 3rem;
}
</style>

