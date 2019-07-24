<template>
  <div v-if="options" class="options">
    <div class="option" v-for="option in options" :key="option.title">
      <h3>{{option.name}}</h3>
      <product-option-swatches v-on:optionSet="setSelectedOptions" :option="option" />
    </div>
    <!-- {{selectedOptions}} -->
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
  components: {
    ProductOptionSwatches
  },
  data() {
    return {
      selectedOptions: []
    }
  },
  watch: {
    selectedOptions(newVal) {
      this.$emit('selectedOptions', newVal)
    }
  },
  methods: {
    setSelectedOptions(selectedOption) {
      let searchOptions = this.selectedOptions.filter(option => {
        return option.name == selectedOption.name
      })
      if (searchOptions.length == 0) {
        this.selectedOptions.push(selectedOption)
      } else {
        let index = this.selectedOptions.findIndex(option => {
          return option.name == selectedOption.name
        })
        this.selectedOptions.splice(index, 1, selectedOption)
      }
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
