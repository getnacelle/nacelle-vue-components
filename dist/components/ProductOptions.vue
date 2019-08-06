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
export default {
  props: {
    options: {
      type: Array
    }
  },
  data() {
    return {
      selectedOptions: []
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
    allOptionsSelected() {
      if (this.selectedOptions.length == this.options.length) {
        return true
      } else if (
        this.options.length == 1 &&
        this.options[0].values.length == 1
      ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    setSelectedOptions(selectedOption) {
      let vm = this
      let searchOptions = this.selectedOptions.filter(option => {
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
      if (vm.allOptionsSelected) {
        vm.$emit('selectedOptionsSet', vm.selectedOptions)
      }
    },
    confirmSelection() {
      this.$emit('confirmedSelection')
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
