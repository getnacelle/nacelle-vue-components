<template>
  <div class="page-content nacelle">
    <slot :page="page">
      <div v-for="section in mappedSections" :key="section.id">
        <slot name="section" :section="section">
          <component
            v-if="section.contentType"
            :is="section.contentType"
            :id="section.handle"
            v-bind="section.props"
          />
        </slot>
      </div>
    </slot>
    <slot name="body" :body="body">
      <div class="page-content-body section">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-8 content" v-html="body" />
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import ContentHeroBanner from './ContentHeroBanner'
import ContentSideBySide from './ContentSideBySide'
import ContentTestimonials from './ContentTestimonials'
import ContentProductGrid from './ContentProductGrid'

export default {
  components: {
    ContentHeroBanner,
    ContentSideBySide,
    ContentTestimonials,
    ContentProductGrid
  },
  props: {
    page: {
      type: Object,
      default: () => ({
        source: '',
        sections: []
      })
    },
    products: {
      type: Array,
      default: () => ([])
    },
    customContentToHtml: {
      type: Boolean,
      default: false
    },
    contentToHtmlFn: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    contentToHtml() {
      if (this.customContentToHtml) {
        return this.contentToHtmlFn
      }

      return this.defaultContentToHtml
    },
    mappedSections() {
      if (this.page && this.page.sections && this.page.sections.length > 0) {
        const { source, sections } = this.page
        if (source === 'contentful') {
          return sections.map(this.mapContentfulSection)
        }

        if (source === 'shopify') {
          return this.reduceShopifySections(sections).map(this.mapShopifySection)
        }

        return sections
      }

      return []
    },
    body() {
      if (this.page && this.page.fields && this.page.fields.body) {
        const { source } = this.page
        
        if (source === 'shopify') {
          return this.page.fields.body
        }

        if (source === 'contentful') {
          return this.contentToHtml(this.page.fields.body)
        }

        return ''
      }
    }
  },
  methods: {
    defaultContentToHtml(content) {
      const options = {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node) => `
            <img class="post-image" src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.title}" />
          `
        }
      }
    
      return documentToHtmlString(content, options)
    },
    formatShopifySection(section) {
      const { tags, ...rest } = section.node
      const tagFields = {}
      
      tags.forEach(tag => {
        if (tag.includes('field::')) {
          const [ field, key, value ] = tag.split('::')
          tagFields[key] = value
        }
      })
    
      return {
        ...tagFields,
        ...rest,
        tags
      }
    },
    reduceShopifySections(sections) {
      return sections.reduce((sections, section, index) => {
        const formatted = this.formatShopifySection(section)

        if (index > 0 && formatted.tags.includes('childSection')) {
          const parent = sections[sections.length - 1]

          if (parent.children) {
            parent.children.push(formatted)
          } else {
            parent.children = [formatted]
          }
        } else {
          sections.push(formatted)
        }

        return sections
      }, [])
    },
    mapShopifySection(section) {
      const { title, handle, contentHtml, contentType } = section
      const clickHandler = () => {
        this.$router.push(section.ctaUrl)
      }
      let props = {}

      if (section.contentType === 'ContentHeroBanner') {
        const {
          ctaText,
          ctaUrl,
          image,
          size,
          alignment,
          mobileFullHeight,
          textColor,
          mobileBackgroundImgUrl,
          backgroundAltTag
        } = section

        props = {
          title,
          subtitle: contentHtml ? contentHtml : '',
          ctaText,
          ctaUrl,
          ctaHandler: clickHandler,
          backgroundImgUrl: image ? image.originalSrc : '',
          size,
          alignment,
          mobileFullHeight: (mobileFullHeight === 'true'),
          textColor,
          mobileBackgroundImgUrl,
          backgroundAltTag
        }
      }

      if (section.contentType === 'ContentSideBySide') {
        const {
          ctaText,
          ctaUrl,
          image,
          backgroundColor,
          reverseDesktop,
          reverseMobile
        } = section

        props = {
          title,
          copy: contentHtml,
          ctaText,
          ctaUrl,
          ctaHandler: clickHandler,
          backgroundColor,
          imageUrl: image ? image.originalSrc : '',
          reverseDesktop: (reverseDesktop === 'true'),
          reverseMobile: (reverseMobile === 'true')
        }
      }

      if (section.contentType === 'ContentTestimonials') {
        const { slidesPerView, alignment } = section
        let slides = []

        if (section.children) {
          slides = section.children.map(child => {
            return {
              name: child.title,
              quote: child.contentHtml,
              imageUrl: child.image ? child.image.originalSrc : undefined
            }
          })
        }

        props = {
          title,
          slides,
          slidesPerView: slidesPerView || 1,
          alignment
        }
      }

      if (section.contentType === 'ContentProductGrid') {
        const { columns } = section

        props = {
          title,
          products: this.products,
          columns: columns || 4
        }
      }

      return {
        handle,
        contentType,
        props
      }
    },
    mapContentfulSection(section) {
      const { fields } = section
      const { contentType, handle, title, content, featuredMedia } = fields
      const contentHtml = this.contentToHtml(content)
      const imageSrc =
        featuredMedia && featuredMedia.fields ? featuredMedia.fields.file.url : ''
      let props = {}

      if (fields && fields.contentType === 'ContentHeroBanner') {
        const {
          subtitle,
          ctaUrl,
          ctaText,
          size,
          alignment,
          mobileFullHeight,
          textColor,
          mobileBackgroundImage,
          backgroundAltTag
        } = fields
        const clickHandler = () => {
          this.$router.push(fields.ctaUrl)
        }

        props = {
          title,
          subtitle,
          ctaText,
          ctaUrl,
          ctaHandler: clickHandler,
          backgroundImgUrl: imageSrc,
          size,
          alignment,
          mobileFullHeight: (String(fields.mobileFullHeight) === 'true'),
          textColor,
          mobileBackgroundImgUrl: 
            mobileBackgroundImage ? mobileBackgroundImage.fields.file.url : '',
          backgroundAltTag
        }
      }

      if (fields && fields.contentType === 'ContentSideBySide') {
        const {
          ctaText,
          ctaUrl,
          backgroundColor,
          reverseDesktop,
          reverseMobile
        } = fields
        const clickHandler = () => {
          this.$router.push(fields.ctaUrl)
        }

        props = {
          title,
          copy: contentHtml,
          ctaText,
          ctaUrl,
          ctaHandler: clickHandler,
          backgroundColor,
          imageUrl: imageSrc,
          reverseDesktop: (String(reverseDesktop) === 'true'),
          reverseMobile: (String(reverseMobile) === 'true')
        }
      }

      if (fields && fields.contentType === 'ContentTestimonials') {
        const { slidesPerView, alignment } = fields
        let slides = []

        if (fields.slides) {
          slides = fields.slides.map(child => {
            return {
              name: child.fields.name,
              quote: child.fields.quotation,
              imageUrl:
                child.fields.featuredMedia ? child.fields.featuredMedia.fields.file.url : undefined
            }
          })
        }

        props = {
          title,
          slides,
          slidesPerView: slidesPerView || 1,
          alignment
        }
      }

      if (fields && fields.contentType === 'ContentProductGrid') {
        const { columns } = fields
        
        props = {
          title,
          products: this.products,
          columns: parseInt(columns, 10) || 4
        }
      }

      return {
        handle,
        contentType,
        props
      }
    }
  }
}
</script>

<style>

</style>