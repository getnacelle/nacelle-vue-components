import { mapState } from 'vuex'
import { getPage, getCollection } from '@nacelle/nacelle-tools'

export default params => {
  return {
    mixins: [
      getPage({ pageHandle: 'homepage', ...params }),
      getCollection({ pageHandle: 'homepage', ...params })
    ],
    computed: {
      ...mapState('space', ['name'])
    }
  }
}
