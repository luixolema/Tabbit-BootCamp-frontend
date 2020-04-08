<template>
  <div>
    <v-row>
      <v-col
        class="py-0"
        cols="8"
      >
        <h5 class="display-2   pt-1">
          Equipment
        </h5>
      </v-col>
      <v-col
        class="py-0"
        cols="4"
      >
        <v-btn
          class="my-2"
          x-small
          block
          :disabled="disableAdd"
        >
          Add
          <v-icon
            right
            dark
            size="15"
          >
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-card class="my-0">
      <!-- Table -->
      <v-data-table
        dense
        height="50vh"
        :headers="headers"
        :items="dummyData"
        hide-default-footer
        item-key="id"
      />
    </v-card>
  </div>
</template>

<script>
  const headers = [
    { text: 'Key', value: 'type' },
    { text: 'ID', value: 'id' },
    { text: 'Date Out', value: 'dateOut' },
    { text: 'Date Return', value: 'dateReturn' },
  ]
  const dummyData = [{ id: 'XD_S_255', type: 'Suite', dateOut: '15.09.2019', dateReturn: null },
                     { id: 'XD_F_547', type: 'Fins', dateOut: '15.09.2019', dateReturn: '20.09.2019' },
                     { id: 'XD_M_17', type: 'Mask', dateOut: '15.09.2019', dateReturn: '20.09.2019' }]
  const EquipmentComponent = {
    data: function () {
      return {
        headers,
        height: '350px',
        dummyData,
      }
    },
    props: {
      equipments: Array,
    },
    computed: {
      disableAdd () {
        const selectedGuest = this.$store.state.guestModule.selectedGuest
        if (selectedGuest !== undefined) {
          return selectedGuest.checkedin === false
        } else {
          return true
        }
      },
    },
  }

  export default EquipmentComponent
</script>

<style>
    .highlight {
        background-color: #EEEEEE
    }
</style>
