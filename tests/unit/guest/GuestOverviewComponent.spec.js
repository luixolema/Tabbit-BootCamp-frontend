import { mount } from '@vue/test-utils'
import GuestOverviewComponent from '@/views/components/guests/GuestOverviewComponent.vue'
import Vue from 'vue'
import Axios from 'axios'
import Vuetify from 'vuetify'

const fakeGuestResponse = {
  guests: [
    {
      id: 1,
      firstName: 'Antonio',
      lastName: 'Banderas',
      boxId: 12,
      checkedin: true,
    },
    {
      id: 2,
      firstName: 'Anthony',
      lastName: 'Hopkins',
      boxId: 7,
      checkedin: false,
    },
    {
      id: 3,
      firstName: 'Monica',
      lastName: 'Bellucci ',
      boxId: 3,
      checkedin: false,
    },
    {
      id: 4,
      firstName: 'Keanu',
      lastName: 'Reeves',
      boxId: 10,
      checkedin: false,
    },
  ],
  total: 4,
}

jest.mock('axios')
Vue.use(Vuetify)

describe('GuestOverviewComponent', () => {

    beforeAll(() => {
        Axios.get.mockImplementation(() => Promise.resolve(fakeGuestResponse))
    })

//   it('should render ok', async () => {
//     const wrapper = mountFunction(GuestOverviewComponent)
//     expect(wrapper.contains('.display-2')).toBe(true)
//   })

  it('should show all the guest by defualt', async () => {
    const wrapper = mount(GuestOverviewComponent)

    expect(wrapper.contains('.display-2')).toBe(true)
    Vue.nextTick()

    const table = wrapper.find('table')
    // expect(table).toBeDefined()
    expect(table.findAll('tr').length).toEqual(4)
  })

  describe('On select filter', () => {
    it('should show only checking on check in filter active', async () => {
      const wrapper = mountFunction(GuestOverviewComponent)
      // waiting for the response
      Vue.nextTick()

      const table = wrapper.find('table')
      expect(table).toBeDefined()

      const checkedInFilter = wrapper.find('#checkedInFilter')
      expect(checkedInFilter).toBeDefined()
      checkedInFilter.setChecked()

      // waiting for the filter
      Vue.nextTick()
      expect(table.findAll('tr').length).toBe(3)
    })

    it('should show only not checkedin on checked in filter active ', async () => {
      const wrapper = mountFunction(GuestOverviewComponent)
      // waiting for the response
      Vue.nextTick()

      const table = wrapper.find('table')
      expect(table).toBeDefined()

      const checkedInFilter = wrapper.find('#noCheckedInFilter')
      expect(checkedInFilter).toBeDefined()
      checkedInFilter.setChecked()

      // waiting for the filter
      Vue.nextTick()
      expect(table.findAll('tr').length).toBe(1)
    })

    it('should show all after select all filter again ', async () => {
      const wrapper = mountFunction(GuestOverviewComponent)
      // waiting for the response
      Vue.nextTick()

      const table = wrapper.find('table')
      expect(table).toBeDefined()

      const checkedInFilter = wrapper.find('#noCheckedInFilter')
      checkedInFilter.setChecked()

      // waiting for the filter
      Vue.nextTick()
      expect(table.findAll('tr').length).toBe(1)

      const allFilter = wrapper.find('#allFilter')
      allFilter.setChecked()

      // waiting for the filter
      Vue.nextTick()
      expect(table.findAll('tr').length).toBe(4)
    })
  })
})
