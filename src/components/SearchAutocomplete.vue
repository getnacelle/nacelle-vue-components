<template>
  <transition name="fade-up">
    <div
      class="autocomplete is-hidden-mobile"
      v-show="shouldShowAutocomplete"
      @mouseenter="cursorInside = true"
      @mouseleave="setNotVisibleAndClearQuery"
    >
      <h2>Search Results</h2>
      <search-results
        :searchData="productData"
        :searchQuery="query"
        slotMode="multiple"
        v-if="productData"
        v-on:results="setAutocompleteVisible"
        v-on:no-query="setAutocompleteNotVisible"
      >
        <template v-slot:result="{ result }">
          <search-autocomplete-item v-for="item in result" :item="item" :key="item.id" />
        </template>
        <template v-slot:no-results>
          <search-no-results />
        </template>
      </search-results>
    </div>
  </transition>
</template>

<script>
import SearchResults from './SearchResults'
import SearchNoResults from './SearchNoResults'
import SearchAutocompleteItem from './SearchAutocompleteItem'
import { allProductsJSON } from '@nacelle/nacelle-graphql-queries-mixins'
import { mapState, mapMutations, mapGetters } from 'vuex'
import ClickOutside from 'vue-click-outside'
export default {
  data() {
    return {
      productData: null,
      cursorInside: false
    }
  },
  components: {
    SearchResults,
    SearchNoResults,
    SearchAutocompleteItem
  },
  watch: {
    $route() {
      this.setAutocompleteNotVisible()
    }
  },
  computed: {
    ...mapState('search', ['autocompleteVisible']),
    ...mapGetters('search', ['queryOrigin']),
    shouldShowAutocomplete() {
      if (
        this.autocompleteVisible &&
        this.queryOrigin &&
        this.queryOrigin == 'global'
      ) {
        return true
      }
      return
    }
  },
  methods: {
    ...mapMutations('search', ['setAutocompleteVisible']),
    ...mapMutations('search', ['setAutocompleteNotVisible']),
    ...mapMutations('search', ['setQuery']),
    setNotVisibleAndClearQuery() {
      let vm = this
      vm.cursorInside = false
      setTimeout(() => {
        if (!vm.cursorInside) {
          this.setAutocompleteNotVisible()
        }
      }, 600)
      this.setQuery(null)
    }
  },
  destroyed() {
    console.log('component destroyed')
  },
  mixins: [allProductsJSON],
  directives: {
    ClickOutside
  }
}
</script>

<style lang="scss" scoped>
.autocomplete {
  background: white;
  position: absolute;
  z-index: 9999;
  top: 4rem;
  right: 1rem;
  width: 30rem;
  overflow: scroll;
  height: 30rem;
  border-radius: 5px;
  padding: 1rem;
  box-shadow: -1px 4px 7px 0px rgba(0, 0, 0, 0.08);
  @media screen and (max-width: 786px) {
    right: 0;
    left: 0;
    width: 100%;
    top: 40vh;
  }
}
h2 {
  text-align: center;
  font-size: 18pt;
}
.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-up-enter, .fade-up-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(20px);
}
</style>