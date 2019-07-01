/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info'

import ContentTestimonial from '../components/ContentTestimonial'

const alignmentOptions = {
  Left: 'left',
  Right: 'right',
  Centered: 'centered'
}

storiesOf('Components | Content', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'Testimonial',
    () => ({
      components: { ContentTestimonial },
      props: {
        name: {
          default: text('Name', '@username')
        },
        quote: {
          default: text('Quote', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus a vulputate viverra. Sed vel varius libero, id luctus sem.')
        },
        imageUrl: {
          default: text('Image Url', 'https://placehold.it/400x400')
        },
        roundedImage: {
          default: boolean('Rounded Image', false)
        },
        alignment: {
          default: select('Text Alignment', alignmentOptions, 'left')
        }
      },
      template: `
        <content-testimonial
          :imageUrl="imageUrl"
          :name="name"
          :quote="quote"
          :roundedImage="roundedImage"
          :alignment="alignment"
        />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
