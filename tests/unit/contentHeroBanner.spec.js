import { mount, shallowMount } from '@vue/test-utils'
import ContentHeroBanner from '@/components/ContentHeroBanner'

const defaults = {
  backgroundImgUrl:
    'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-banner-img.png',
  title: 'Hero Title',
  subtitle: 'Subtitle copy text',
  ctaText: 'CTA BUTTON'
}

describe('ContentHeroBanner.vue', () => {
  it('renders a banner', async () => {
    const wrapper = shallowMount(ContentHeroBanner, {
      propsData: { ...defaults }
    })
    expect(wrapper.classes()).toContain('hero')
  })

  it('button click triggers custom event', () => {
    const mockClickHandler = jest.fn()
    const wrapper = mount(ContentHeroBanner, {
      propsData: {
        ...defaults,
        ctaHandler: mockClickHandler
      }
    })
    const button = wrapper.find('button')

    button.trigger('click')

    expect(mockClickHandler).toHaveBeenCalled()
  })

  // it('optimizes the format of a Shopify banner', async () => {
  //   const wrapper = shallowMount(ContentHeroBanner, {
  //     propsData: {
  //       ...defaults,
  //       backgroundImgUrl:
  //         'https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68.png?v=1563167567&width=750',
  //       resize: false,
  //     },
  //   })
  //   expect(wrapper.html()).toBe(
  //     '<section class="hero nacelle is-medium is-align-center "><picture class="hero-background"><!----> <!----> <img src="https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68.png?v=1563167567&amp;width=750&amp;format=webp" alt=""></picture> <div class="hero-body"><div class="container"><div class="hero-body-inner"><h1 class="title">Hero Title</h1> <h3 class="subtitle">Subtitle copy text</h3> <p><cta-button-stub to="">CTA BUTTON</cta-button-stub></p></div></div></div></section>'
  //   )
  // })

  // it('optimizes the size of a Shopify banner', async () => {
  //   const wrapper = shallowMount(ContentHeroBanner, {
  //     propsData: {
  //       ...defaults,
  //       backgroundImgUrl:
  //         'https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68.png?v=1563167567&width=750',
  //       reformat: false,
  //     },
  //     data: function() {
  //       return {
  //         containerWidth: 450,
  //         containerHeight: 300,
  //       }
  //     },
  //   })
  //   expect(wrapper.html()).toBe(
  //     '<section class="hero nacelle is-medium is-align-center "><picture class="hero-background"><!----> <!----> <img src="https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68_450x300.png?v=1563167567" alt=""></picture> <div class="hero-body"><div class="container"><div class="hero-body-inner"><h1 class="title">Hero Title</h1> <h3 class="subtitle">Subtitle copy text</h3> <p><cta-button-stub to="">CTA BUTTON</cta-button-stub></p></div></div></div></section>'
  //   )
  // })

  // it('optimizes both the size and the format of a Shopify banner', async () => {
  //   const wrapper = shallowMount(ContentHeroBanner, {
  //     propsData: {
  //       ...defaults,
  //       backgroundImgUrl:
  //         'https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68.png?v=1563167567&width=750',
  //     },
  //     data: function() {
  //       return {
  //         containerWidth: 450,
  //         containerHeight: 300,
  //       }
  //     },
  //   })
  //   expect(wrapper.html()).toBe(
  //     '<section class="hero nacelle is-medium is-align-center "><picture class="hero-background"><!----> <!----> <img src="https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68_450x300.png?v=1563167567&amp;format=webp" alt=""></picture> <div class="hero-body"><div class="container"><div class="hero-body-inner"><h1 class="title">Hero Title</h1> <h3 class="subtitle">Subtitle copy text</h3> <p><cta-button-stub to="">CTA BUTTON</cta-button-stub></p></div></div></div></section>'
  //   )
  // })

  it('returns null when the url is undefined', async () => {
    const wrapper = shallowMount(ContentHeroBanner, {
      propsData: {
        ...defaults,
        backgroundImgUrl: undefined
      },
      data: function() {
        return {
          containerWidth: 450,
          containerHeight: 300
        }
      }
    })
    expect(wrapper.find('img').attributes('src')).toBe('')
  })
})

// src="https://nacelle-assets.s3-us-west-2.amazonaws.com/default-banner-img_450x300.png?v=1563167567&amp;format=webp"
