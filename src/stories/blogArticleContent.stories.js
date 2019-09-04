/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import {
  withKnobs,
  text,
  boolean,
  array,
  select,
  object
} from '@storybook/addon-knobs'
import StoryRouter from 'storybook-vue-router'
import store from '../store/store'
import {
  defaultProduct,
  shopifyArticle,
  contentfulArticle
} from '../../config/defaultObjects.js'

import BlogArticleContent from '../components/BlogArticleContent'

const storyWrapper = () => {
  return {
    template: `
      <div style="padding: 3rem; max-width: 720px; margin: 0 auto;"><story/></div>
    `
  }
}

storiesOf('Components | Content / Blog / Article Content', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .addDecorator(storyWrapper)
  .add(
    'Shopify',
    () => ({
      components: { BlogArticleContent },
      data() {
        return {
          article: shopifyArticle
        }
      },
      template: `
        <blog-article-content :article="article" />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

storiesOf('Components | Content / Blog / Article Content', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .addDecorator(storyWrapper)
  .add(
    'Shopify with Shop Look',
    () => ({
      components: { BlogArticleContent },
      store,
      data() {
        return {
          article: shopifyArticle,
          products: [defaultProduct]
        }
      },
      template: `
        <blog-article-content
          :article="article"
          :products="products"
        />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

storiesOf('Components | Content / Blog / Article Content', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .addDecorator(storyWrapper)
  .add(
    'Contentful',
    () => ({
      components: { BlogArticleContent },
      data() {
        return {
          article: contentfulArticle
        }
      },
      template: `
        <blog-article-content
          :article="article"
        />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

storiesOf('Components | Content / Blog / Article Content', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .addDecorator(storyWrapper)
  .add(
    'Customized',
    () => ({
      components: { BlogArticleContent },
      data() {
        return {
          article: contentfulArticle
        }
      },
      template: `
        <blog-article-content :article="article">
          <div>
            <h1 class="title">This is extra content appended to the article</h1>
          </div>
        </blog-article-content>
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
