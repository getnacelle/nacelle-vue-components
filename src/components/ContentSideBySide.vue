<template>
  <section class="sbs sbs-target">
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
  margin-top: 0;

  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
  }

  @media screen and (min-width: 769px) {
    min-height: 400px;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.sbs .columns.is-column-reverse {
  @media screen and (min-width: 769px) {
    flex-direction: row-reverse;
  }
}

.sbs .columns.is-mobile-column-reverse {
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
  }
}

.column.sbs-image {
  position: relative;
  padding: 0;

  img {
    display: block;
    width: 100%;

    @media screen and (min-width: 769px) {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
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

