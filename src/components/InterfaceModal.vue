<template>
  <div class="modal-wrapper" v-on:close="closeModal">
    <transition name="fade">
      <div v-show="modalOpen" class="modal-outer">
        <div class="container">
          <div class="columns">
            <div class="modal-inner column is-6">
              <interface-close-button class="close" v-on:close="closeModal" />
              <div class="modal-content" v-if="modalOpen">
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
  padding: 2rem;
  padding-top: 6rem;
  width: 100%;
  background-color: rgba(#000, 0.7);
  overflow: scroll;
  z-index: 998;

  @media screen and (min-width: 769px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
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

