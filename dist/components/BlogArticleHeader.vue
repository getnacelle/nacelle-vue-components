<template>
  <header>
    <slot name="tags" :tags="tags">
      <h5 v-if="hasTags" class="article-tags">{{ tags.join(', ') }}</h5>
    </slot>
    <slot name="title" :title="title">
      <h1 class="article-title title is-3">{{ title }}</h1>
    </slot>
    <slot name="author" :author="author">
      <p class="article-author">{{ author.firstName }} {{ author.lastName }}</p>
    </slot>
    <slot name="date" :date="absoluteDate">
      <p class="article-published">Published on {{absoluteDate}}</p>
    </slot>
    <slot></slot>
  </header>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    author: {
      type: Object,
      default: () => {
        return {
          firstName: '',
          lastName: ''
        }
      }
    },
    tags: {
      type: Array,
      default: () => []
    },
    publishDate: {
      type: String,
      default: ''
    },
    dateFormatString: {
      type: String,
      default: 'MMMM D, YYYY'
    }
  },
  computed: {
    hasTags() {
      return this.tags && this.tags.length > 0
    },
    absoluteDate() {
      return dayjs(this.publishDate).format(this.dateFormatString)
    }
  }
}
</script>

<style>
</style>
