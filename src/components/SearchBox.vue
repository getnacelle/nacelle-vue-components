<template>
  <div class="search" :class="`${position}-searchbox`">
    <search-input
      :placeholderText="placeholderText"
      :position="position"
      @focus.native="getData"
      @keydown.enter.native="navigateToSearchResults"
    />
    <button
      v-if="position == 'global'"
      class="button"
      @click="navigateToSearchResults"
    >
      Search
    </button>
    <search-autocomplete v-if="position == 'global'"/>
  </div>
</template>

<script>
import SearchInput from './SearchInput'
import SearchAutocomplete from './SearchAutocomplete'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    SearchInput,
    SearchAutocomplete
  },
  props: {
    position: {
      type: String,
      default: 'global'
    },
    searchCategory: {
      type: String,
      default: 'product'
    },
    placeholderText: {
      type: String,
      default: 'Search products..'
    },
    navigateOnSubmit: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState('search', ['query'])
  },
  methods: {
    ...mapMutations('menu', ['disableMenu']),
    ...mapActions('search', ['getProductData']),
    getData() {
      if (this.searchCategory === 'product') {
        this.getProductData()
      }
    },
    navigateToSearchResults() {
      this.disableMenu()

      if (this.navigateOnSubmit) {
        if (this.query && this.query.value && this.query.value.length > 0) {
          this.$router.push({ path: '/search', query: { q: this.query.value } })
        } else {
          this.$router.push({ path: '/search' })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  position: relative;
}
.global-searchbox input,
.global-searchbox button {
  margin-right: 0.5rem;
}
</style>