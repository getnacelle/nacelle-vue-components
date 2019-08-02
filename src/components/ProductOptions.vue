<template>
  <div v-if="options" class="options">
    <div class="option" v-for="option in options" :key="option.title">
      <h3>{{option.name}}</h3>
      <product-option-swatches v-on:optionSet="setSelectedOptions" :option="option" />
    </div>
    <button
      class="button is-primary"
      :disabled="!allOptionsSelected"
      v-if="isChildOfModal"
      @click="confirmSelection"
    >
      <span v-if="allOptionsSelected">Confirm Selection</span>
      <span v-else>Select your options</span>
    </button>
  </div>
</template>

<script>
import ProductOptionSwatches from './ProductOptionSwatches'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  props: {
    options: {
      type: Array
    }
  },
  components: {
    ProductOptionSwatches
  },

  computed: {
    isChildOfModal() {
      if (this.$parent.$options._componentTag == 'interface-modal') {
        return true
      } else {
        return false
      }
    },
    ...mapGetters('product', ['allOptionsSelected'])
  },
  methods: {
    ...mapMutations('product', ['setSelectedOptions']),
    ...mapActions('product', ['confirmSelection'])
  }
}
</script>

<style lang="scss" scoped>
.option {
  margin-bottom: 1rem;
}

.swatches {
  display: flex;
}
h3 {
  font-weight: 600;
  text-transform: uppercase;
}
.selected {
  background: red;
}
</style>
