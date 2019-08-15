import { mount } from '@vue/test-utils'
import BlogArticlePreview from '@/components/BlogArticlePreview'

describe('BlogArticlePreview.vue', () => {
  it('renders article preview', async () => {
    const wrapper = mount(BlogArticlePreview, {
      stubs: ['router-link'],
      propsData: {
        isFeatured: false,
        title: 'Article Preview Title',
        handle: 'article-preview-title',
        excerpt:
          'He has this ability of instantly interpreting and extrapolating any verbal communication he hears. It may be due to the envelope over the structure, causing hydrogen-carbon helix patterns throughout.',
        tags: [],
        featuredMedia: {
          src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/article-featured-media.jpeg',
          type: 'image/jpeg'
        }
      }
    })

    expect(wrapper.find('.article-preview').exists()).toBe(true)
  })

  it('renders article preview as featured preview', async () => {
    const wrapper = mount(BlogArticlePreview, {
      stubs: ['router-link'],
      propsData: {
        isFeatured: true,
        title: 'Article Preview Title',
        handle: 'article-preview-title',
        excerpt:
          'He has this ability of instantly interpreting and extrapolating any verbal communication he hears. It may be due to the envelope over the structure, causing hydrogen-carbon helix patterns throughout.',
        tags: [],
        featuredMedia: {
          src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/article-featured-media.jpeg',
          type: 'image/jpeg'
        }
      }
    })

    expect(wrapper.find('.article-preview.is-featured').exists()).toBe(true)
  })
})
