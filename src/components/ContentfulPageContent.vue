<template>
  <div class="page-content">
    <slot v-bind:content="mappedContent">
      <component
        v-for="section in mappedContent"
        :key="section.id"
        :is="section.contentType"
        :id="section.handle"
        v-bind="mapProps(section)"
      />
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

const contentToHtmlString = content => {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => `
        <img class="post-image" src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.title}" />
      `
    }
  }

  return documentToHtmlString(content, options)
}

export default {
  components: {
    ContentHeroBanner,
    ContentSideBySide,
    ContentTestimonials,
    ContentProductGrid
  },
  props: {
    content: {
      type: Array,
      default: () => {
        return []
      }
    },
    products: {
      type: Array,
      default: () => {
        return []
      }
    },
    contentToHtmlFn: {
      type: Function,
      default: contentToHtmlString
    }
  },
  computed: {
    mappedContent() {
      // return this.content.reduce((sections, section, index) => {
      //   const formatted = formatSection(section)

      //   if (index > 0 && formatted.tags.includes('childSection')) {
      //     const parent = sections[sections.length - 1]

      //     if (parent.children) {
      //       parent.children.push(formatted)
      //     } else {
      //       parent.children = [formatted]
      //     }
      //   } else {
      //     sections.push(formatted)
      //   }

      //   return sections
      // }, [])
      return this.content
    }
  },
  methods: {
    mapProps(section) {
      if (section.contentType === 'ContentHeroBanner') {
        const { content } = section.fields
        const clickHandler = () => {
          this.$router.push(section.ctaUrl)
        }

        return {
          title: section.title,
          subtitle: content ? content : '',
          ctaText: section.ctaText,
          ctaUrl: section.ctaUrl,
          ctaHandler: clickHandler,
          backgroundImgUrl: section.featuredMedia.src,
          size: section.size,
          alignment: section.alignment,
          mobileFullHeight: (section.mobileFullHeight === 'true'),
          textColor: section.textColor,
          mobileBackgroundImgUrl: section.mobileBackgroundImgUrl,
          backgroundAltTag: section.backgroundAltTag
        }
      }

      if (section.contentType === 'ContentSideBySide') {
        const { content } = section.fields
        const clickHandler = () => {
          this.$router.push(section.ctaUrl)
        }

        return {
          title: section.title,
          copy: content,
          ctaText: section.ctaText,
          ctaUrl: section.ctaUrl,
          ctaHandler: clickHandler,
          backgroundColor: section.backgroundColor,
          imageUrl: section.featuredMedia.src,
          reverseDesktop: (section.reverseDesktop === 'true'),
          reverseMobile: (section.reverseMobile === 'true')
        }
      }

      if (section.contentType === 'ContentTestimonials') {
        let slides = []

        if (section.children) {
          slides = section.children.map(child => {
            return {
              name: child.title,
              quote: child.fields.content,
              imageUrl: child.featuredMedia ? child.featuredMedia.src : undefined
            }
          })
        }

        return {
          title: section.title,
          slides,
          slidesPerView: section.slidesPerView || 1,
          alignment: section.alignment
        }
      }

      if (section.contentType === 'ContentProductGrid') {
        return {
          title: section.title,
          products: this.products,
          columns: section.columns || 4
        }
      }
    }
  }
}
</script>

<style>

</style>
