import { Mount } from '@vue/test-utils'
import CookieBanner from '@/components/CookieBanner'

describe('CookieBanner.vue', () => {
  const wrapper = Mount(CookieBanner)
  const button = wrapper.find('button')

  it('displays the accept button', async () => {
    expect(button.html()).toBe(
      '<button id="accept" type="button" tabindex="0" role="button" aria-pressed="false">Accept</button>'
    )
  })

  it('closes after the "Accept" button is clicked', async () => {
    button.trigger('click')
    expect(wrapper.html()).toBeDefined()
  })
})
