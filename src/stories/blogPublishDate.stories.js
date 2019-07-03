/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'

import BlogPublishDate from '../components/BlogPublishDate'

storiesOf('Components | Content / Blog / Publish Date', module)
  .addDecorator(withInfo)

  .add(
    'Absolute Time',
    () => ({
      components: { BlogPublishDate },
      data() {
        return {
          date: '2019-07-03'
        }
      },
      template: `<blog-publish-date :date="date"/>`
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

storiesOf('Components | Content / Blog / Publish Date', module)
  .addDecorator(withInfo)

  .add(
    'Relative Time',
    () => ({
      components: { BlogPublishDate },
      data() {
        return {
          date: '2019-07-03'
        }
      },
      template: `<blog-publish-date :date="date" :relativeTime="true"/>`
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
