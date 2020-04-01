<template>
  <v-card class="my-0">
    <!-- Table -->
    <v-simple-table
      height="24vh"
      :fixed-header="true"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Key
            </th>
            <th class="text-left">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Box</td>
            <td>{{ stayDetails.boxNumber }}</td>
          </tr>
          <tr>
            <td>Check in</td>
            <td>{{ stayDetails.checkInDate }}</td>
          </tr>
          <tr>
            <td>Check out</td>
            <td>{{ stayDetails.checkOutDate }}</td>
          </tr>
          <tr>
            <td>Arrive</td>
            <td>{{ stayDetails.arriveDate }}</td>
          </tr>
          <tr>
            <td>Leave</td>
            <td>{{ stayDetails.leaveDate }}</td>
          </tr>
          <tr>
            <td>Hotel</td>
            <td>{{ stayDetails.hotel }}</td>
          </tr>
          <tr>
            <td>Room</td>
            <td>{{ stayDetails.room }}</td>
          </tr>
          <tr>
            <td>Last dive</td>
            <td>{{ stayDetails.lastDiveDate }}</td>
          </tr>
          <tr>
            <td>Brevet</td>
            <td>{{ stayDetails.brevet }}</td>
          </tr>
          <tr>
            <!--Number of logged dives -->
            <td>Number of dives</td>
            <td>{{ stayDetails.divesAmount }}</td>
          </tr>
          <tr>
            <td>Nitrox</td>
            <td>
              <v-icon v-if="stayDetails.nitrox == 1">
                mdi-check-bold
              </v-icon>
              <v-icon v-else>
                mdi-close-thick
              </v-icon>
            </td>
          </tr>
          <tr>
            <td>Medical Statement</td>
            <td>
              <v-icon v-if="stayDetails.medicalStatement == 1">
                mdi-check-bold
              </v-icon>
              <v-icon v-else>
                mdi-close-thick
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
  const StayDetailsComponent = {
    data: function () {
      return {
      }
    },
    props: {
      stayDetails: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      StayDatailsFormated () {
        const result = []
        const stayDetailsCopy = [...this.stayDetails]

        Object.keys(stayDetailsCopy).forEach(key => {
          const name = key
          const value = stayDetailsCopy[key]

          result.push({ name, value })
        })

        return result
      },
    },
  }

  export default StayDetailsComponent
</script>

<style>
    .highlight {
        background-color: #EEEEEE
    }
</style>
