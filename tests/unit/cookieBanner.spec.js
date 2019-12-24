import { mount } from '@vue/test-utils'
import CookieBanner from '@/components/CookieBanner'

const wrapper = mount(CookieBanner)
const button = wrapper.find('button')

describe('CookieBanner.vue', () => {
  it('displays the accept button', async () => {
    expect(button.html()).toBe(
      '<button id="accept" type="button" tabindex="0" role="button" aria-pressed="false">Accept</button>'
    )
  })
})

describe('CookieBanner.vue', () => {
  it('closes after the "Accept" button is clicked', async () => {
    button.trigger('click')
    expect(wrapper.html()).toBe(undefined)
  })
})
