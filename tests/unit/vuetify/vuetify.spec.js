// test/CustomCard.spec.js

// Libraries
import Vuetify from 'vuetify'

// Components
import CustomCard from '@/components/CustomCard'

// Utilities
import { mount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('CustomCard.vue', () => {
  let vuetify

  const mountFunction = (c, options) => {
    return mount(c, {
      localVue,
      vuetify,
      ...options,
    })
  }

  it('should emit an event when the action v-btn is clicked', () => {
    const wrapper = mountFunction(CustomCard, {
      propsData: {
        title: 'Foobar',
      },
    })

    const event = jest.fn()
    const button = wrapper.find('.v-btn')

    // Here we bind a listener to the wrapper
    // instance to catch our custom event
    // https://vuejs.org/v2/api/#Instance-Methods-Events
    wrapper.vm.$on('action-btn:clicked', event)

    expect(event).toHaveBeenCalledTimes(0)

    // Simulate a click on the button
    button.trigger('click')

    // Ensure that our mock event was called
    expect(event).toHaveBeenCalledTimes(1)
  })
})
