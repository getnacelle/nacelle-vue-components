<template>
  <div class="page-content">
    <component
      v-for="section in mappedContent"
      :key="section.id"
      :is="section.contentType"
      v-bind="mapProps(section)"
    />
  </div>
</template>

<script>
import ContentHeroBanner from './ContentHeroBanner'
import ContentSideBySide from './ContentSideBySide'
import ContentTestimonials from './ContentTestimonials'
import ContentProductGrid from './ContentProductGrid'

const formatSection = (section) => {
  const { tags, ...rest } = section
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
}

export default {
  components: {
    ContentHeroBanner,
    ContentSideBySide,
    ContentTestimonials,
    ComponentsProductGid
  },
  props: {
    content: {
      type: Array,
      default: () => []
    },
    products: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    mappedContent() {
      return this.content.reduce((sections, section, index) => {
        const formatted = formatSection(section)

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
          backgroundImgUrl: section.featuredMedia.src
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
          imageUrl: section.featuredMedia.src
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
          slides
        }
      }

      if (section.contentType === ContentProductGrid) {
        return {
          title: section.title,
          products: this.products
        }
      }
    }
  }
}
</script>

<style>

</style>
