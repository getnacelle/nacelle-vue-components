<template>
  <div class="search" :class="`${position}-searchbox`">
    <template v-if="position == 'global'">
      <search-input
        :placeholderText="placeholderText"
        @keydown.enter.native="navigateToSearchResults"
        :position="position"
        @focus.native="getData"
      />
      <button class="button" @click="navigateToSearchResults">Search</button>
      <search-autocomplete />
    </template>
    <template v-else>
      <search-input :placeholderText="placeholderText" :position="position" />
    </template>
  </div>
</template>

<script>
import SearchInput from './SearchInput'
import SearchAutocomplete from './SearchAutocomplete'
import { mapMutations, mapActions } from 'vuex'

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
    }
  },
  methods: {
    ...mapMutations('menu', ['disableMenu']),
    ...mapActions('search', ['getProductData']),
    getData() {
      console.log('getting Data')
      if (this.searchCategory === 'product') {
        this.getProductData()
      }
    },
    navigateToSearchResults() {
      this.disableMenu()

      this.$router.push('/search')
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