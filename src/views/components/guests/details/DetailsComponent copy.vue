<template>
  <v-card>
    <!-- Table -->
    <v-simple-table
      :height="height"
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
            <td>Box Number</td>
            <td>boxNumber</td>
          </tr>
          <tr>
            <td>Check in</td>
            <td>checkInDate</td>
          </tr>
          <tr>
            <td>Check out</td>
            <td>checkOutDate</td>
          </tr>
          <tr>
            <td>Arrive</td>
            <td>arriveDate</td>
          </tr>
          <tr>
            <td>Leave</td>
            <td>leaveDate</td>
          </tr>
          <tr>
            <td>Hotel</td>
            <td>hotel</td>
          </tr>
          <tr>
            <td>Room</td>
            <td>room</td>
          </tr>
          <tr>
            <td>Last dive</td>
            <td>lastDiveDate</td>
          </tr>
          <tr>
            <td>Brevet</td>
            <td>brevet</td>
          </tr>
          <tr>
            <!--Number of logged dives -->
            <td>Number of dives</td>
            <td>divesAmount</td>
          </tr>
          <tr>
            <td>Nitrox</td>
            <td>
              <!-- <v-icon v-if="stayDetails.nitrox">
                  mdi-check-bold
                </v-icon>
                <v-icon v-else>
                  mdi-close-thick
                </v-icon> -->
            </td>
          </tr>
          <tr>
            <td>Medical Statement</td>
            <td>
              <!-- <v-icon v-if="stayDetails.medicalStatement">
                  mdi-check-bold
                </v-icon>
                <v-icon v-else>
                  mdi-close-thick
                </v-icon> -->
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
        height: '200px',
      }
    },
    props: {
      stayDetails: Object,
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
