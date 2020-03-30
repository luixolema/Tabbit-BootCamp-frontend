import axios from 'axios'
import GuestService from '../../src/services/GuestService'

jest.mock('axios')

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

it('should fetch something', async () => {
    axios.get.mockImplementation(() => Promise.resolve(fakeGuestResponse))
    const response = await GuestService.findAll()

    expect(response).toEqual(fakeGuestResponse)
})
