/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, text, array} from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router'

import BlogArticleHeader from '../components/BlogArticleHeader'


storiesOf('Components | Content / Blog / Article Header', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add(
    'Default',
    () => ({
      components: { BlogArticleHeader },
      props: {
        title: {
          default: text('Title', 'Article Title')
        },
        tags: {
          default: array('Tags', [])
        },
        author: {
          default: text('Author', 'Firstname Lastname')
        },
        dateFormat: {
          default: text('Date Format', 'MMMM D, YYYY')
        }
      },
      data() {
        return {
          date: '2019-08-09T00:00-07:00'
        }
      },
      template: `
        <blog-article-header
          :title="title"
          :author="author"
          :tags="tags"
          :publishDate="date"
          :dateFormatString="dateFormat"
        />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

  storiesOf('Components | Content / Blog / Article Header', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add(
    'Custom Content',
    () => ({
      components: { BlogArticleHeader },
      props: {
        title: {
          default: text('Title', 'Article Title')
        },
        tags: {
          default: array('Tags', [])
        },
        author: {
          default: text('Author', 'Firstname Lastname')
        },
        dateFormat: {
          default: text('Date Format', 'MMMM D, YYYY')
        }
      },
      data() {
        return {
          date: '2019-08-09T00:00-07:00'
        }
      },
      template: `
        <blog-article-header
          :title="title"
          :author="author"
          :tags="tags"
          :publishDate="date"
          :dateFormatString="dateFormat"
        >
          <template v-slot:title="{ title }">
            <h2>
              Custom: {{ title }}
            </h2>
          </template>
          <template v-slot:date="{ date }">
            <p>{{ date }}</p>
          </template>
          <div>
            <p>Additional Content added below</p>
          </div>
        </blog-article-header>
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )