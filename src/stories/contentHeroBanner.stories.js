/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'

import ContentHeroBanner from '../components/ContentHeroBanner'

const defaults = {
  backgroundImgUrl: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-banner-img.png',
  title: 'Hero Title',
  subtitle: 'Subtitle copy text',
  ctaText: 'CTA BUTTON'
}

storiesOf('Components | Content / Hero Banner', module)
  .addDecorator(withInfo)
  .add(
    'Default',
    () => ({
      components: { ContentHeroBanner},
      data() {
        return {
          ...defaults
        }
      },
      template: `
        <content-hero-banner
          :backgroundImgUrl="backgroundImgUrl"
          :title="title"
          :subtitle="subtitle"
          :ctaText="ctaText"
        />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

storiesOf('Components | Content / Hero Banner', module)
  .addDecorator(withInfo)
  .add(
    'Full height',
    () => ({
      components: { ContentHeroBanner},
      data() {
        return {
          ...defaults,
          size: 'fullheight'
        }
      },
      template: `
        <content-hero-banner
          :size="size"
          :backgroundImgUrl="backgroundImgUrl"
          :title="title"
          :subtitle="subtitle"
          :ctaText="ctaText"
        />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

storiesOf('Components | Content / Hero Banner', module)
  .addDecorator(withInfo)
  .add(
    'Text Color',
    () => ({
      components: { ContentHeroBanner},
      data() {
        return {
          ...defaults,
          textColor: '#ffffff'
        }
      },
      template: `
        <content-hero-banner
          :backgroundImgUrl="backgroundImgUrl"
          :title="title"
          :subtitle="subtitle"
          :ctaText="ctaText"
          :textColor="textColor"
        />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

storiesOf('Components | Content / Hero Banner', module)
  .addDecorator(withInfo)
  .add(
    'Custom CTA event',
    () => ({
      components: { ContentHeroBanner},
      data() {
        return {
          ...defaults,
          ctaHandler: action('CTA click')
        }
      },
      template: `
        <content-hero-banner
          :backgroundImgUrl="backgroundImgUrl"
          :title="title"
          :subtitle="subtitle"
          :ctaText="ctaText"
          :ctaHandler="ctaHandler"
        />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

storiesOf('Components | Content / Hero Banner', module)
  .addDecorator(withInfo)
  .add(
    'Mobile image',
    () => ({
      components: { ContentHeroBanner},
      data() {
        return {
          ...defaults,
          mobileFullHeight: true,
          mobileBackgroundImgUrl: 
            'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-mobile-banner.png'
        }
      },
      template: `
        <content-hero-banner
          :backgroundImgUrl="backgroundImgUrl"
          :mobileBackgroundImgUrl="mobileBackgroundImgUrl"
          :mobileFullHeight="mobileFullHeight"
          :title="title"
          :subtitle="subtitle"
          :ctaText="ctaText"
        />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

  storiesOf('Components | Content / Hero Banner', module)
  .addDecorator(withInfo)
  .add(
    'Custom Slots',
    () => ({
      components: { ContentHeroBanner},
      data() {
        return {
          ...defaults,
          mobileFullHeight: true,
          mobileBackgroundImgUrl: 
            'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-mobile-banner.png'
        }
      },
      template: `
        <content-hero-banner
          :backgroundImgUrl="backgroundImgUrl"
          :mobileBackgroundImgUrl="mobileBackgroundImgUrl"
          :mobileFullHeight="mobileFullHeight"
          :title="title"
          :subtitle="subtitle"
          :ctaText="ctaText"
        >
          <template v-slot:background="{ backgroundImgUrl }">
            <img :src="backgroundImgUrl" width="300px" alt="" />
          </template>
          <template v-slot:body>
            <h5>Testing Slots</h5>
          </template>
          <template v-slot:cta="{ ctaText }">
            <p>{{ ctaText }}</p>
          </template>
        </content-hero-banner>
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
