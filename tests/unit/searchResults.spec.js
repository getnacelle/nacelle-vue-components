import { mount, createLocalVue } from '@vue/test-utils'
import SearchResults from '@/components/SearchResults'
const localVue = createLocalVue()

describe('SearchResults.vue', () => {
  it('provides search results from a supplied query and search data', async () => {
    const wrapper = mount(SearchResults, {
      localVue,
      propsData: {
        searchQuery: { value: 'test' },
        searchData: [
          { title: 'test', description: 'cool' },
          { title: 'wow', description: 'right.' }
        ]
      }
    })
    expect(wrapper.vm.searchResults).toEqual([
      { title: 'test', description: 'cool' }
    ])
  })
})
