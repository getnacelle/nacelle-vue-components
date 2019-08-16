/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, text, boolean, array, select, object } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router'
import store from '../store/store'
import { defaultProduct, shopifyArticle, contentfulArticle } from '../../config/defaultObjects.js'

import BlogArticleView from '../components/BlogArticleView'


storiesOf('Components | Content / Blog / Article View', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add(
    'Shopify',
    () => ({
      components: { BlogArticleView },
      data() {
        return {
          article: shopifyArticle
        }
      },
      template: `
        <blog-article-view
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

  storiesOf('Components | Content / Blog / Article View', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add(
    'Shopify with Shop Look',
    () => ({
      components: { BlogArticleView },
      store,
      data() {
        return {
          article: shopifyArticle,
          products: [defaultProduct]
        }
      },
      template: `
        <blog-article-view
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

  storiesOf('Components | Content / Blog / Article View', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add(
    'Contentful',
    () => ({
      components: { BlogArticleView },
      data() {
        return {
          article: contentfulArticle
        }
      },
      template: `
        <blog-article-view
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
