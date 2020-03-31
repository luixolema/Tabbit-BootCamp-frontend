<template>
  <div>
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
            <guest-personal-details-component v-bind:headers="headers" />
          </v-col>
          <v-col
            class="py-0"
            cols="12"
          >
            stayDetailsComponent
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="6"
      >
        <v-row>
          <v-col cols="12">
            equipmentComponent
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        activitiesComponent
      </v-col>
    </v-row>
  </div>
</template>

<script>

  import GuestPersonalDetailsComponent from '@/views/components/guests/details/personal/GuestPersonalDetailsComponent'

  export default {
    name: 'GeneralAreaComponent',
    components: {
      GuestPersonalDetailsComponent,
    },
    data: () => {
      return {
        headers: [
          { text: 'Key', value: 'key' },
          { text: 'Value', value: 'value' },
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
    mounted () {
      this.test()
    },
    methods: {
      test () {
      },
    },
  }
</script>

<style>
</style>
