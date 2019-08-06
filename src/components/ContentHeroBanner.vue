<template>
  <section :class="bannerClasses">
    <picture class="hero-background">
      <source
        v-if="mobileBackgroundImgUrl.length > 0"
        media="(min-width: 787px)"
        :srcset="backgroundImgUrl"
      >
      <source
        v-if="mobileBackgroundImgUrl.length > 0"
        media="(max-width: 786px)"
        :srcset="mobileBackgroundImgUrl"
      >
      <img :src="backgroundImgUrl" :alt="backgroundAltTag">
    </picture>
    <div class="hero-body">
      <div class="container">
        <div class="hero-body-inner">
          <h1
            class="title"
            :style="textColor && textColor.length > 0 ? `color: ${textColor}` : ''"
          >
            {{ title }}
          </h1>
          <h3
            class="subtitle"
            :style="textColor && textColor.length > 0 ? `color: ${textColor}` : ''"
          >
            {{ subtitle}}
          </h3>
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
    alignment: {
      type: String,
      default: 'center'
    },
    size: {
      type: String,
      default: 'medium'
    },
    mobileFullHeight: {
      type: Boolean,
      default: false
    },
    backgroundImgUrl: {
      type: String,
      default: ''
    },
    mobileBackgroundImgUrl: {
      type: String,
      default: ''
    },
    backgroundAltTag: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
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
    textColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    bannerClasses() {
      const mobileHeightClass = this.mobileFullHeight ? 'is-mobile-fullheight' : ''

      return `hero is-${this.size} is-align-${this.alignment} ${mobileHeightClass}`
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  position: relative;

  &.is-mobile-fullheight {
    @media screen and (max-width: 786px) {
      height: 100vh;
    }
  }
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.is-mobile-fullheight .hero-body {
  display: flex;
  align-items: center;
}

.is-align-center .hero-body .container {
  display: flex;
  justify-content: center;
  text-align: center;
}

.is-align-right .hero-body .container {
  display: flex;
  justify-content: flex-end;
  text-align: right;
}

.hero-body-inner {
  max-width: 500px;
}
</style>

