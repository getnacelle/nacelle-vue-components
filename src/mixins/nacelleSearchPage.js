import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default params => {
  return {
    data() {
      return {
        filteredData: null
      }
    },
    computed: {
      ...mapState('search', ['query', 'loadedData']),
      ...mapGetters('search', ['productData'])
    },
    watch: {
      loadedData(newVal) {
        if (newVal) {
          if (this.$route.query && this.$route.query.q) {
            this.setQuery({
              origin: 'in-page',
              value: this.$route.query.q
            })
          }
        }
      }
    },
    created () {
      if (process.browser) {
        this.getProductData()
      }
    },
    methods: {
      ...mapMutations('search', ['setQuery']),
      ...mapActions('search', ['getProductData']),
      updateFilteredData(data) {
        this.filteredData = data
      }
    }
  }
}
