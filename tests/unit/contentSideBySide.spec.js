import { shallowMount } from '@vue/test-utils'
import ContentSideBySide from '@/components/ContentSideBySide'

const defaults = {
  imageUrl: 'https://placehold.it/800x800',
  title: 'Hero Title',
  copy: 'Subtitle copy text',
  ctaText: 'CTA BUTTON'
}

describe('ContentSideBySide.vue', () => {
  beforeEach(() => {
    global.IntersectionObserver = class IntersectionObserver {
      observe() {
        return null
      }

      unobserve() {
        return null
      }
    }
  })

  it('renders a side by side section', async () => {
    const wrapper = shallowMount(ContentSideBySide, {
      propsData: { ...defaults }
    })
    expect(wrapper.classes()).toContain('sbs')
  })
})
