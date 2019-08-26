<template>
  <div>
    <p >{{verb}} on {{absoluteDate}}</p>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    verb: {
      type: String,
      default: 'Published'
    },
    date: {
      type: String,
      required: true
    }
  },
  computed: {
    absoluteDate() {
      return dayjs(this.date).format('MMMM D, YYYY')
    }
  }
}
</script>

<style>
</style>
