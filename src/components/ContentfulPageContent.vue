<template>
  <div class="page-content">
    <slot v-bind:content="mappedContent">
      <component
        v-for="section in mappedContent"
        v-if="section.fields.contentType"
        :key="section.id"
        :is="section.fields.contentType"
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
      const { title, featuredMedia, fields } = section
      const content = this.contentToHtmlFn(fields.content)

      if (fields && fields.contentType === 'ContentHeroBanner') {   
        const clickHandler = () => {
          this.$router.push(fields.ctaUrl)
        }

        return {
          title,
          subtitle: fields.subtitle,
          ctaText: fields.ctaText,
          ctaUrl: fields.ctaUrl,
          ctaHandler: clickHandler,
          backgroundImgUrl: featuredMedia.src ? featuredMedia.src : '',
          size: fields.size,
          alignment: fields.alignment,
          mobileFullHeight: (String(fields.mobileFullHeight) === 'true'),
          textColor: fields.textColor,
          mobileBackgroundImgUrl: '',
          backgroundAltTag: fields.backgroundAltTag
        }
      }

      if (fields && fields.contentType === 'ContentSideBySide') {
        const clickHandler = () => {
          this.$router.push(fields.ctaUrl)
        }

        return {
          title,
          copy: content,
          ctaText: fields.ctaText,
          ctaUrl: fields.ctaUrl,
          ctaHandler: clickHandler,
          backgroundColor: fields.backgroundColor,
          imageUrl: featuredMedia.src ? featuredMedia.src : '',
          reverseDesktop: (String(fields.reverseDesktop) === 'true'),
          reverseMobile: (String(fields.reverseMobile) === 'true')
        }
      }

      if (fields && fields.contentType === 'ContentTestimonials') {
        let slides = []

        // if (section.children) {
        //   slides = section.children.map(child => {
        //     return {
        //       name: child.title,
        //       quote: child.fields.content,
        //       imageUrl: child.featuredMedia ? child.featuredMedia.src : undefined
        //     }
        //   })
        // }

        return {
          title,
          slides,
          slidesPerView: fields.slidesPerView || 1,
          alignment: fields.alignment
        }
      }

      if (fields && fields.contentType === 'ContentProductGrid') {
        return {
          title,
          products: this.products,
          columns: parseInt(fields.columns, 10) || 4
        }
      }
    }
  }
}
</script>

<style>

</style>
