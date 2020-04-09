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
          :disabled="disableForHystoricalData"
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
        height="50vh"
        fixed-header
        :headers="headers"
        :items="dummyData"
        hide-default-footer
        disable-pagination
      />
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'EquipmentComponent',
    props: {
      equipments: {
        type: Array,
        default: () => ([]),
      },
      disableForHystoricalData: {
        type: Boolean,
        default: false,
      },
    },
    data: function () {
      return {
        dummyData: [{ id: 'XD_S_255', type: 'Suite', dateOut: '15.09.2019', dateReturn: null },
                    { id: 'XD_F_547', type: 'Fins', dateOut: '15.09.2019', dateReturn: '20.09.2019' },
                    { id: 'XD_M_17', type: 'Mask', dateOut: '15.09.2019', dateReturn: '20.09.2019' },
        ],
        headers: [{ text: 'Key', value: 'type' },
                  { text: 'ID', value: 'id' },
                  { text: 'Date Out', value: 'dateOut' },
                  { text: 'Date Return', value: 'dateReturn' },
        ],
        height: '350px',
      }
    },
  }
</script>

<style>
    .highlight {
        background-color: #EEEEEE
    }
</style>
