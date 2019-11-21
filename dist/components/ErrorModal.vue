<template>
  <div>
    <interface-modal
      :modal-open="showModal"
      @closeModal="showModal = false"
    >
      {{ error }}
    </interface-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import InterfaceModal from './InterfaceModal'
export default {
  components: {
    InterfaceModal
  },
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapState('cart', ['error'])
  },

  watch: {
    error () {
      this.showModal = true
    }
  }
}
</script>

<style>

</style>
