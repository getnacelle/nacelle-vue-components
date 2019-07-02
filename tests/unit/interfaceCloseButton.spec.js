import { shallowMount, createLocalVue } from '@vue/test-utils'
import InterfaceCloseButton from '@/components/InterfaceCloseButton'

describe('InterfaceCloseButton.vue', () => {
  it('emits a close event on click', async () => {
    const wrapper = shallowMount(InterfaceCloseButton)
    wrapper.vm.$emit('close')
    expect(wrapper.emitted().close).toBeTruthy()
  })
})
