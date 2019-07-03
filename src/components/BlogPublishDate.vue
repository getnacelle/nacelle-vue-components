<template>
  <div>
    <p v-if="!relativeTime">{{verb}} on {{absoluteDate}}</p>
    <p v-else>{{verb}} {{relativeDate}}</p>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
export default {
  props: {
    verb: {
      type: String,
      default: 'Published'
    },
    relativeTime: {
      type: Boolean,
      default: false
    },
    date: {
      type: String,
      required: true
    }
  },
  computed: {
    absoluteDate() {
      return DateTime.fromISO(this.date).toLocaleString(DateTime.DATE_FULL)
    },
    relativeDate() {
      return DateTime.fromISO(this.date).toRelative()
    }
  }
}
</script>

<style>
</style>
