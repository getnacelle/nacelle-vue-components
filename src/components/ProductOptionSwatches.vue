<template>
  <div class="swatches columns is-marginless is-multiline">
    <product-option-swatch
      v-on:swatchValue="setOptionValue"
      v-for="value in option.values"
      :value="value"
      :key="value"
      :swatchStyle="swatchStyle"
      :class="{selected: value == selectedOptionValue}"
    />
  </div>
</template>

<script>
import ProductOptionSwatch from './ProductOptionSwatch'
export default {
  props: {
    option: {
      type: Object
    }
  },
  components: {
    ProductOptionSwatch
  },
  data() {
    return {
      selectedOptionValue: null
    }
  },
  computed: {
    swatchStyle() {
      switch (this.option.name) {
        case 'Color':
          return 'bubble'
        default:
          return 'tab'
      }
    }
  },
  watch: {
    selectedOptionValue(newVal) {
      this.$emit('optionSet', { name: this.option.name, value: newVal })
    }
  },
  methods: {
    setOptionValue(value) {
      this.selectedOptionValue = value
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
  flex-wrap: wrap;
}
h3 {
  font-weight: 600;
  text-transform: uppercase;
}
</style>
