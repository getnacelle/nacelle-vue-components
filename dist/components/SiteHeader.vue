<template>
  <div class="site-header">
    <main-nav
      :logoSrc="logoSrc"
      :logoWidth="logoWidth"
      :menu="menu"
    >
      <template slot="menu">
        <slot name="menu" />
      </template>
    </main-nav>
    <main-nav-flyout
      :logoSrc="logoSrc"
      :logoWidth="logoWidth"
      :menu="menu"
    >
      <template slot="flyout-menu">
        <slot name="flyout-menu" />
      </template>
    </main-nav-flyout>
    <cart-flyout>
      <template v-slot="item">
      <cart-flyout-item :item="item"/>
      </template>
    </cart-flyout>
  </div>
</template>

<script>
import MainNav from './MainNav'
import MainNavFlyout from './MainNavFlyout'
import CartFlyout from './CartFlyout'
import CartFlyoutItem from './CartFlyoutItem'

export default {
  components: {
    MainNav,
    MainNavFlyout,
    CartFlyout,
    CartFlyoutItem
  },
  props: {
    logoSrc: {
      type: String,
      default: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/nacelle-logo-dark.png'
    },
    logoWidth: {
      type: Number,
      default: 112
    },
    menu: {
      type: Array
    },
  }
}
</script>

<style>

</style>
