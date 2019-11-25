/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'

import ContentTestimonials from '../components/ContentTestimonials'

storiesOf('Components | Content / Testimonials', module)
  .addDecorator(withInfo)
  .add(
    'With Images',
    () => ({
      components: { ContentTestimonials },
      data() {
        return {
          title: 'Testimonials',
          slides: [
            {
              name: '@username1',
              quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus a vulputate viverra. Sed vel varius libero, id luctus sem.',
              imageUrl: 'https://placehold.it/400x400'
            },
            {
              name: '@username-two',
              quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consequat, est sit amet tincidunt maximus, eros nibh pulvinar metus.',
              imageUrl: 'https://placehold.it/400x400'
            },
            {
              name: '@user-three',
              quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat fermentum erat, vel pellentesque ex.',
              imageUrl: 'https://placehold.it/400x400'
            }
          ]
        }
      },
      template: `
        <content-testimonials
          :title="title"
          :slides="slides"
        />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

storiesOf('Components | Content / Testimonials', module)
  .addDecorator(withInfo)
  .add(
    'No Image, Centered',
    () => ({
      components: { ContentTestimonials },
      data() {
        return {
          title: 'Testimonials',
          slides: [
            {
              name: '@username1',
              quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus a vulputate viverra. Sed vel varius libero, id luctus sem.'
            },
            {
              name: '@username-two',
              quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consequat, est sit amet tincidunt maximus, eros nibh pulvinar metus.'
            },
            {
              name: '@user-three',
              quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat fermentum erat, vel pellentesque ex.'
            }
          ]
        }
      },
      template: `
        <content-testimonials
          :alignment="'centered'"
          :title="title"
          :slides="slides"
        />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

storiesOf('Components | Content / Testimonials', module)
  .addDecorator(withInfo)
  .add(
    '2-Up',
    () => ({
      components: { ContentTestimonials },
      data() {
        return {
          title: 'Testimonials',
          slides: [
            {
              name: '@username1',
              quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus a vulputate viverra. Sed vel varius libero, id luctus sem.'
            },
            {
              name: '@username-two',
              quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consequat, est sit amet tincidunt maximus, eros nibh pulvinar metus.'
            },
            {
              name: '@user-three',
              quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat fermentum erat, vel pellentesque ex.'
            }
          ]
        }
      },
      template: `
        <content-testimonials
          :alignment="'centered'"
          :title="title"
          :slides="slides"
          :slidesPerView="2"
        />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
