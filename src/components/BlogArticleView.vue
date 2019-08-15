<template>
  <div class="article">
    <div class="article-hero">
      <transition name="fade">
        <interface-featured-media
          v-if="article && article.featuredMedia"
          :media="article.featuredMedia"
        />
      </transition>
    </div>
    <div class="article-body container">
      <transition name="fadeDelay">
        <div v-if="article" class="columns is-centered is-multiline">
          <div class="article-header column is-6 has-text-centered">
            <h5
              v-if="article.tags && article.tags.length > 0"
              class="article-tags"
            >
              {{ article.tags.join(', ') }}
            </h5>
            <h1 class="title is-3">{{ article.title }}</h1>
            <blog-publish-date
              v-if="article.publishDate" :date="article.publishDate"
            />
          </div>
          <div class="column is-9 content">
            <div v-html="content" ref="content" />
            <client-only v-if="products && products.length > 0">
              <product-shop-look
                v-for="(shopImage, index) in shopImages"
                :key="index"
                :imageSrc="shopImage.src"
                :products="shopImage.products"
                @ready="(node) => moveImage(shopImage.node, node)"
              />
            </client-only>
            <router-link :to="blogUrl" class="breadcrumb">{{ backToBlogText }}</router-link>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import ClientOnly from 'vue-client-only'
import InterfaceFeaturedMedia from './InterfaceFeaturedMedia'
import ProductShopLook from './ProductShopLook'
import BlogPublishDate from './BlogPublishDate'

const contentToHtmlString = content => {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        if (node.data.target.fields && node.data.target.fields.file) {
          return `
            <img
              class="post-image"
              src="${node.data.target.fields.file.url}"
              alt="${node.data.target.fields.title}"
            />
          `
        }
        
        return ''
      }
    }
  }

  return documentToHtmlString(content, options)
}

export default {
  components: {
    ClientOnly,
    InterfaceFeaturedMedia,
    ProductShopLook,
    BlogPublishDate
  },
  props: {
    article: {
      type: Object,
      default: () => {
        return {}
      }
    },
    products: {
      type: Array,
      default: () => {
        return []
      }
    },
    blogUrl: {
      type: String,
      default: '/blog'
    },
    backToBlogText: {
      type: String,
      default: 'Back to Blog'
    },
    contentToHtmlFn: {
      type: Function,
      default: contentToHtmlString
    }
  },
  data() {
    return {
      waitingToUpdate: true,
      shopImages: []
    }
  },
  computed: {
    content() {
      if (this.article && this.article.source === 'contentful') {
        return this.contentToHtmlFn(this.article.fields.content)
      }

      if (this.article.fields && this.article.fields.contentHtml) {
        return this.article.fields.contentHtml
      }

      return ''
    }
  },
  updated() {
    this.$nextTick(() => {
      if (
        this.waitingToUpdate &&
        this.products &&
        typeof this.$refs.content !== 'undefined' &&
        this.$refs.content.innerHTML.length > 0
      ) {
        this.updateImages()
      }
    })
  },
  methods: {
    updateImages() {
      this.shopImages = []
      const images = [...this.$el.querySelectorAll('.article-body img')]

      images.forEach(image => {
        const handles = image.alt.split(',')
        const products = this.products.filter(({ handle }) =>
          handles.includes(handle)
        )

        if (products.length > 0) {
          this.shopImages.push({
            node: image,
            src: image.src,
            products: products
          })
        }
      })

      this.waitingToUpdate = false
    },
    moveImage(imageNode, shopLookNode) {
      imageNode.parentNode.replaceChild(shopLookNode, imageNode)
    }
  }
}
</script>

<style lang="scss" scoped>
.article-hero {
  height: 300px;
  background: #f5f5f5;

  @media screen and (min-width: 769px) {
    height: 400px;
  }

  /deep/ .featured-media {
    width: 100%;
    height: 100%;

    figure,
    img {
      width: 100%;
      height: 100%;
    }

    img {
      object-fit: cover;
    }
  }
}

.article-body {
  position: relative;
  margin-top: -3rem;
  padding: 2rem;
  padding-bottom: 5rem;
  background-color: #ffffff;
  border: 1px solid #f5f5f5;
  max-width: 1024px;
}

.article-tags {
  margin-bottom: 1em;
}

.article-body .content {
  position: relative;
}

.fade-enter-active {
  transition: opacity 0.25s;
}
.fade-enter {
  opacity: 0;
}

.fadeDelay-enter-active {
  transition: opacity 0.55s 0.25s;
}
.fadeDelay-enter {
  opacity: 0;
}
</style>

