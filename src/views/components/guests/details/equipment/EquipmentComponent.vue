<template>
  <div>
    <v-row>
      <v-col
        class="py-0"
        cols="8"
      >
        <h5 class="display-2   pt-1">
          Loans
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
        :items="loanDetails"
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
      disableForHystoricalData: {
        type: Boolean,
        default: false,
      },
    },
    data: function () {
      return {
        headers: [{ text: 'Type', value: 'type' },
                  { text: 'Serial', value: 'serial' },
                  { text: 'Date Out', value: 'dateOut' },
                  { text: 'Date Return', value: 'dateReturn' },
        ],
        height: '350px',
      }
    },
    computed: {
      loanDetails () {
        var loans
        if (this.$store.state.stayModule.stayData) {
          loans = this.$store.state.stayModule.stayData.loanDetails
        }
        if (!loans) { return [] }

        const items = []

        Array.prototype.forEach.call(loans, loan =>
          items.push({
            type: loan.type,
            serial: loan.serialNumber,
            dateOut: loan.dateOut,
            dateReturn: loan.dateReturn,
          }),
        )

        return items
      },
    },
  }
</script>

<style>
    .highlight {
        background-color: #EEEEEE
    }
</style>
