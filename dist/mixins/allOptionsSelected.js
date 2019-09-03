export default {
  data() {
    return {
      selectedOptions: []
    }
  },

  watch: {
    lineItems() {
      this.selectedOptions = []
    }
  },
  computed: {
    allOptionsSelected() {
      if (
        this.allOptions &&
        this.selectedOptions &&
        this.selectedOptions.length == this.allOptions.length
      ) {
        return true
      } else if (
        this.allOptions &&
        this.allOptions.length == 1 &&
        this.allOptions[0].values.length == 1
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
