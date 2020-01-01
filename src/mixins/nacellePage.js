import { getPage, getCollection } from '@nacelle/nacelle-tools'

export default params => {
  return {
    mixins: [getPage(), getCollection()]
  }
}
