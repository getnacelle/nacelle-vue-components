import { mapState } from 'vuex'
import { getPage, getCollection } from '@nacelle/nacelle-tools'

export default {
  mixins: [
    getPage({ pageHandle: 'homepage' }),
    getCollection({ pageHandle: 'homepage' })
  ],
  computed: {
    ...mapState('space', ['name'])
  }
}
