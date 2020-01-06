import { mapState } from 'vuex'
import { getPage, getCollection } from '@nacelle/nacelle-tools'

export default params => {
  return {
    mixins: [
      getPage({ pageHandle: 'homepage' }),
      getCollection({ pageHandle: 'homepage' })
    ],
    computed: {
      ...mapState('space', ['name'])
    }
  }
}
