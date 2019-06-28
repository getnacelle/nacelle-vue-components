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

storiesOf('Components | Content', module)
  .addDecorator(withInfo)
  .add(
    'Hero Banner - default',
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
  .add(
    'Hero Banner - full height',
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
  .add(
    'Hero Banner - text color',
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
  .add(
    'Hero Banner - custom CTA event',
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
  .add(
    'Hero Banner - mobile image',
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
