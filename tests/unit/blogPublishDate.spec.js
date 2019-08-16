import store from '../../src/store/store'
import { mount } from '@vue/test-utils'
import BlogPublishDate from '@/components/BlogPublishDate'
import { DateTime } from 'luxon'

describe('CartFlyoutHeader.vue', () => {
  it('prints the publish date', async () => {
    const wrapper = mount(BlogPublishDate, {
      propsData: { date: '2019-07-03' }
    })
    expect(wrapper.text()).toBe('Published on July 3, 2019')
  })

  it('prints the publish date with a custom verb', async () => {
    const wrapper = mount(BlogPublishDate, {
      propsData: { verb: 'Posted', date: '2019-07-03' }
    })

    expect(wrapper.text()).toBe('Posted on July 3, 2019')
  })
})
