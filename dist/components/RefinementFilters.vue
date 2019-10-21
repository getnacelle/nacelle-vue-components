<template>
  <div class="filters">
    <h3>Refine Your Search</h3>
    <div class="filter" v-for="filter in filters" :key="filter.property.field">
      <h4>{{filter.property.label}}</h4>
      <div class="control">
        <label class="radio" v-for="value in filter.values" :key="value">
          <input
            type="radio"
            :name="filter.property.field"
            @click="setFilterActive({property: filter.property.field, value:value})"
            :checked="filterActive(value)"
          />
          {{value}}
        </label>
      </div>
    </div>
    <button class="button is-text" @click="setFiltersCleared">Clear Filters</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import queryString from 'query-string'
import { omit } from 'search-params'
export default {
  props: {
    inputData: {
      type: Array,
      required: true
    },
    filterProperties: {
      type: Array,
      required: true
    },
    passingConditions: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      activeFilters: [],
      passedData: null
    }
  },
  watch: {
    outputData() {
      this.$emit('updated', this.outputData)
    },
    filtersCleared(val) {
      if (val == true) {
        this.activeFilters = []
        this.removeFiltersInQueryParams()
      }
    }
  },
  computed: {
    ...mapState('search', ['filtersCleared']),

    filters() {
      let vm = this
      if (vm.inputData && vm.filterProperties) {
        let propertyValues = vm.filterProperties.map(property => {
          let rawValues = vm.inputData
            .map(item => {
              return item[`${property.field}`]
            })
            .filter(value => {
              return value != ''
            })
          let dedupedValues = Array.from(new Set(rawValues))
          return {
            property: property,
            values: dedupedValues
          }
        })
        return propertyValues
      }
    },
    outputData() {
      let vm = this
      if (vm.activeFilters.length > 0 && vm.inputData) {
        let output = this.inputData.filter(item => {
          let filterChecks = vm.activeFilters.map(filter => {
            if (filter.value == item[filter.property]) {
              return true
            } else {
              return false
            }
          })
          let itemShouldPass = filterChecks.every(filterCheck => {
            return filterCheck == true
          })
          return itemShouldPass
        })
        return output
      }
      
      return vm.inputData
    }
  },
  methods: {
    ...mapMutations('search', ['setFiltersCleared']),
    ...mapMutations('search', ['setFiltersNotCleared']),
    filterActive(value) {
      if (this.activeFilters) {
        let filterArray = this.activeFilters.filter(filter => {
          return filter.value == value
        })
        if (filterArray.length > 0) {
          return true
        } else {
          return false
        }
      }
    },
    setFilterActive(filter) {
      let filterInFilters = this.activeFilters.filter(filtersItem => {
        return filtersItem.property == filter.property
      })
      if (filterInFilters.length == 0) {
        this.activeFilters.push(filter)
      } else {
        this.activeFilters = this.activeFilters.map(filtersItem => {
          if (filtersItem.property == filter.property) {
            return filter
          } else {
            return filtersItem
          }
        })
      }
      this.setFilterInQueryParams(filter)
      this.setFiltersNotCleared()
    },
    setFilterInQueryParams(filter) {
      if (process.browser) {
        let parsed = queryString.parse(location.search)
        let transformedFilter = {
          [filter.property]: filter.value
        }
        parsed = { ...parsed, ...transformedFilter }
        this.$router.push({ query: parsed })
      }
    },
    removeFiltersInQueryParams() {
      if (process.browser) {
        let filtersFromUrl = this.filterProperties.map(filter => {
          return filter.field
        })
        let queryParamsString = queryString.stringify(
          queryString.parse(location.search)
        )
        let queryWithoutFilters = omit(queryParamsString, filtersFromUrl)
          .querystring
        this.$router.push({ query: queryString.parse(queryWithoutFilters) })
      }
    },
    async readFiltersFromQueryParams() {
      return new Promise((resolve, reject) => {
        let parsed = queryString.parse(location.search)
        let filtersFromUrl = this.filterProperties
          .map(filter => {
            return { property: filter.field, value: parsed[filter.field] }
          })
          .filter(filter => {
            return filter.value != undefined
          })

        if (filtersFromUrl.length > 0) {
          resolve(filtersFromUrl)
        } else {
          resolve([])
        }
      })
    },
    getPassedData() {
      let vm = this
      if (vm.passingConditions) {
        return vm.inputData.filter(item => {
          let conditions = vm.passingConditions.map(passingCondition => {
            let passing = new Function(
              `return "${passingCondition.value}" ${
                passingCondition.conditional
              } "${item[passingCondition.property]}"`
            )

            return passing()
          })
          let passedConditions = conditions.every(condition => {
            return condition == true
          })
          return passedConditions == true
        })
      } else {
        return vm.inputData
      }
      return vm.inputData
    }
  },
  created() {
    if (process.browser) {
      // this.passedData = this.getPassedData()
      let vm = this
      this.readFiltersFromQueryParams().then(res => {
        this.activeFilters = res
        vm.$emit('updated', vm.outputData)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.filters {
  border-right: 1px solid whitesmoke;
  position: sticky;
  top: 10rem;
}
.filter {
  margin-right: 1rem;
}
.control {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.radio {
  margin: unset;
  margin-bottom: 0.2rem;
}
h3 {
  font-size: 18pt;
  margin-bottom: 1.5rem;
}
h4 {
  font-size: 14pt;
  margin-bottom: 0.5rem;
}
</style>