<template>
  <div v-if="options" class="options">
    <div class="option" v-for="option in options" :key="option.title">
      <h3>{{option.name}}</h3>
      <product-option-swatches
        v-on:optionSet="setSelectedOptions"
        :option="option"
        :clearOptionValue="clearOptionValue"
        v-on:clearedOptionValue="countOptionClear"
      />
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
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    options: {
      type: Array
    }
  },
  components: {
    ProductOptionSwatches
  },
  data() {
    return {
      selectedOptions: [],
      clearOptionValue: false,
      optionsCleared: 0
    }
  },
  watch: {
    allOptionsSelected(value) {
      if (value == true) {
        this.$emit('allOptionsSelected')
      }
      if (this.$parent.$options._componentTag != 'interface-modal') {
        this.$emit('confirmedSelection', this.selectedOptions)
      }
    },
    optionsCleared() {
      if (this.optionsCleared == this.options.length) {
        this.resetClearValues()
        this.optionsCleared = 0
      }
    },
    lineItems() {
      this.$parent.$emit('closeModal')
      if (this.$parent.$options._componentTag == 'interface-modal') {
        this.resetSelectedOptions()
        this.$emit('clearedOptions')
        this.clearValues()
      }
    }
  },

  computed: {
    ...mapState('cart', ['lineItems']),
    allOptionsSelected() {
      if (this.options && this.selectedOptions.length == this.options.length) {
        return true
      } else {
        return false
      }
    },
    isChildOfModal() {
      if (this.$parent.$options._componentTag == 'interface-modal') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    setSelectedOptions(selectedOption) {
      let vm = this
      let searchOptions = vm.selectedOptions.filter(option => {
        return option.name == selectedOption.name
      })
      if (searchOptions.length == 0) {
        vm.selectedOptions.push(selectedOption)
      } else {
        let index = vm.selectedOptions.findIndex(option => {
          return option.name == selectedOption.name
        })
        vm.selectedOptions.splice(index, 1, selectedOption)
      }
    },
    resetSelectedOptions() {
      this.selectedOptions = []
    },
    countOptionClear() {
      this.optionsCleared++
    },
    clearValues() {
      this.clearOptionValue = true
    },
    resetClearValues() {
      this.clearOptionValue = false
    },
    confirmSelection() {
      this.$parent.$emit('confirmedSelection', this.selectedOptions)
    }
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
