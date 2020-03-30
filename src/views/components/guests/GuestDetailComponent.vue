<template>
  <v-card>
    <v-card-text>
      <v-row>
        <!-- Stay selection -->
        <v-combobox
          v-model="selectedStay"
          class="pl-4 pr-4"
          :items="stays"
          item-text="description"
          item-value="id"
          @change="selectStay"
        />
        <v-btn
          small
        >
          Bill
          <v-icon
            right
            dark
          >
            mdi-currency-eur
          </v-icon>
        </v-btn>

        <v-btn
          small
        >
          Checkout
          <v-icon
            right
            dark
            :disabled="enableCheckout"
          >
            mdi-text-box-check-outline
          </v-icon>
        </v-btn>
      </v-row>
      <v-row>
      <!-- GeneralAreaComponent -->
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  const GuestDetailComponent = {
    data: () => {
      return {
        enableCheckout: false,
        selectedStay: undefined,
        stays: [],
      }
    },
    computed: {
      guest: function () {
        return this.$store.state.gestModule.selectedGuest
      },
    },
    methods: {
      selectStay () {
        console.log('stay selected:', this.selectedStay)
      },
    },
  }

  export default GuestDetailComponent
</script>

<style>
</style>
