<template>
  <div class="my-0">
    <v-row>
      <v-col
        class="py-0"
        cols="12"
        md="6"
        lg="6"
      >
        <v-row>
          <v-col
            class="py-0"
            cols="12"
          >
            <guest-personal-details-component
              :headers="headers"
              :selected-stay="selectedStay"
            />
          </v-col>
          <div style="margin:1vh" />
          <v-col
            class="py-0"
            cols="12"
          >
            <stay-details-component
              :headers="headers"
              :disable-for-hystorical-data="disableForHystoricalData"
              @update-error="$emit('update-error')"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="6"
        class="py-0"
      >
        <equipment-component
          :disable-for-hystorical-data="disableForHystoricalData"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        class="mt-1 mb-0 pb-0"
      >
        <activities-component
          :disable-for-hystorical-data="disableForHystoricalData"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>

  import GuestPersonalDetailsComponent from '@/views/components/guests/details/personal/GuestPersonalDetailsComponent'
  import StayDetailsComponent from '@/views/components/guests/details/stay/StayDetailsComponent'
  import EquipmentComponent from '@/views/components/guests/details/equipment/EquipmentComponent'
  import ActivitiesComponent from '@/views/components/guests/details/activity/ActivitiesComponent'

  export default {
    name: 'GeneralAreaComponent',
    components: {
      GuestPersonalDetailsComponent,
      StayDetailsComponent,
      EquipmentComponent,
      ActivitiesComponent,
    },
    props: {
      selectedStay: {
        type: Object,
        default: () => ({}),
      },
      disableForHystoricalData: {
        type: Boolean,
        default: false,
      },
    },
    data: () => {
      return {
        headers: [
          { text: 'Key', value: 'key', sortable: false, width: '120' },
          { text: 'Value', value: 'value', sortable: false },
        ],
      }
    },
    computed: {
      profile () {
        return {
          title: this.$t('guestOverview'),
        }
      },
    },
  }
</script>

<style>
</style>
