<template>
  <p v-if="title != 'Default Title'">{{title}}</p>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>
