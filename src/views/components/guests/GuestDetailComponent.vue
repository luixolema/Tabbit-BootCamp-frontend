<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-row>
          <!-- Stay selection -->
          <v-combobox
            v-model="selectedStay"
            class="pl-4 pr-4"
            :items="guestInfo.stays"
            item-text="description"
            item-value="id"
            @change="selectStay"
          />
          <v-btn small>
            Bill
            <v-icon
              right
              dark
            >
              mdi-currency-eur
            </v-icon>
          </v-btn>

          <v-btn small>
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
        <general-area-component />
        <!-- Example to pass info to another component -->
        <!-- <activities-ifo :guest="selectedStay.activities"> -->
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

  import GeneralAreaComponent from '@/views/components/guests/details/GeneralAreaComponent'
  import GuestService from '@/services/GuestService'
  import NotificationService from '@/services/NotificationService'
  import StayService from '@/services/StayService'

  export default {
    components: {
      GeneralAreaComponent,
    },
    data: () => {
      return {
        enableCheckout: false,
        guestInfo: { stays: [] },
        selectedStay: null,
      }
    },
    computed: {
      guest () {
        const selectedGuest = this.$store.state.guestModule.selectedGuest
        return selectedGuest
      },
      profile () {
        return {
          title: this.$t('guestDetail'),
        }
      },
    },
    watch: {
      guest () {
        const selectedGuest = this.$store.state.guestModule.selectedGuest
        if (selectedGuest) {
          GuestService.getGestInfo(selectedGuest.id)
            .then((response) => {
              this.guestInfo = response.data
              this.buildStaysOptions()
            })
            .catch((error) => {
              NotificationService.error(error.message)
            })
        }
      },
    },
    methods: {
      selectStay (selectedStay) {
        if (selectedStay.id !== null) {
          StayService.findById(selectedStay.id)
            .then((response) => {
              this.guestInfo = response.data
            })
            .catch((error) => {
              NotificationService.error(error.message)
            })
        }
      },
      buildStaysOptions () {
        this.guestInfo.stays = this.guestInfo.stays.map((stay) => {
          if (stay === null) {
            stay = stay || { id: null, description: 'None' }
            return stay
          }

          // mock data TODO: implement after the api is ready
          stay.checkInDate = '12.02.2020'
          stay.checkOutDate = '12,03,2020'

          return {
            id: stay.id,
            description: stay.description || (stay.checkInDate + ' - ' + stay.checkOutDate),
          }
        })

        this.selectedStay = this.guestInfo.stays[0]
      },
    },
  }
</script>

<style>
</style>
