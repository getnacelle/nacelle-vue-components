<template>
  <div v-if="options" class="options">
    <div class="option" v-for="option in options" :key="option.title">
      <h3>{{option.name}}</h3>
      <product-option-swatches
        v-on:optionSet="setSelectedOptions"
        :option="option"
        :clearOptionValue="clearOptionValue"
        v-on:clearedOptionValue="resetClearValues"
      />
    </div>
    <button
      class="button is-primary"
      :disabled="!allOptionsSelected"
      v-if="isChildOfModal"
      @click="triggerModalClose"
    >
      <span v-if="allOptionsSelected">Confirm Selection</span>
      <span v-else>Select your options</span>
    </button>
  </div>
</template>

<script>
import ProductOptionSwatches from './ProductOptionSwatches'
import { mapMutations } from 'vuex'
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
      clearOptionValue: false
    }
  },
  watch: {
    selectedOptions(value) {
      if (value.length > 0) {
        this.$emit('selectedOptions', value)
      }
    },
    allOptionsSelected(value) {
      if (value == true) {
        this.$emit('allOptionsSelected')
      }
    }
  },
  computed: {
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
    clearValues() {
      this.clearOptionValue = true
    },
    resetClearValues() {
      this.clearOptionValue = false
    },
    triggerModalClose() {
      this.$parent.$emit('closeModal')
      this.$parent.$emit('confirmedSelection', this.selectedOptions)
      this.resetSelectedOptions()
      setTimeout(() => {
        this.$emit('clearedOptions')
        this.clearValues()
      }, 200)
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
