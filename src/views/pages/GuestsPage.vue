<template>
  <v-container
    class="py-0"
    fluid
  >
    <v-row>
      <!-- Guest Overview -->
      <v-col
        cols="12"
        sm="12"
        md="4"
        class="flex-grow-1 py-0 px-2"
      >
        <guest-overview-component />
      </v-col>

      <!-- Central Area -->
      <v-col
        cols="12"
        sm="12"
        md="6"
        class="py-0 px-2"
      >
        <guest-detail-component />
      </v-col>

      <!-- Left Area -->
      <v-col
        cols="12"
        sm="12"
        md="2"
        class="px-0"
      >
        <v-card>
          <h1>Left area (not implemented yet)</h1>
          <v-card />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import GuestOverviewComponent from '@/views/components/guests/GuestOverviewComponent'
  import GuestDetailComponent from '@/views/components/guests/GuestDetailComponent'

  export default {
    name: 'GuestsPage',
    components: {
      GuestOverviewComponent,
      GuestDetailComponent,
    },
  }
</script>

<style>
</style>
