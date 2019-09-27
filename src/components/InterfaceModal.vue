<template>
  <div v-on:close="closeModal" class="modal-wrapper nacelle">
    <transition name="fade">
      <div
        v-if="modalOpen"
        @click="clickOuter"
        ref="outer"
        class="modal-outer"
      >
        <div class="container">
          <div class="columns">
            <div class="modal-inner column is-6">
              <interface-close-button class="close" v-on:close="closeModal" />
              <div class="modal-content">
                <slot v-on:close="closeModal"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import InterfaceCloseButton from './InterfaceCloseButton'
export default {
  components: {
    InterfaceCloseButton
  },
  props: {
    modalOpen: {
      type: Boolean
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    clickOuter(e) {
      const { target } = e

      if (target === this.$refs.outer) {
        this.closeModal()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  position: relative;
  overflow: hidden;
  border: 1px solid #f5f5f5;
}

img {
  display: block;
  width: 100%;
}

.modal-outer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  padding-top: 6rem;
  width: 100%;
  background-color: rgba(#000, 0.7);
  z-index: 998;
}

.close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 0.87rem;
  z-index: 99999;
}

.modal-inner {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 2rem;
  max-width: 800px;
  background-color: #ffffff;
  border-radius: 2px;
  min-height: 8rem;
  max-height: 100%;
  overflow: scroll;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

