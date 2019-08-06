export default {
  data() {
    return {
      selectedOptions: []
    }
  },
  computed: {
    allOptionsSelected() {
      if (
        this.product.options &&
        this.selectedOptions &&
        this.selectedOptions.length == this.product.options.length
      ) {
        return true
      } else if (
        this.product.options &&
        this.product.options.length == 1 &&
        this.product.options[0].values.length == 1
      ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    setSelected(options) {
      this.selectedOptions = options
    }
  }
}
