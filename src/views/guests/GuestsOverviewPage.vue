<template>
  <v-container fluid>
    <v-row>
      <!-- Guest Overview -->
      <v-col cols="3">
        <guest-overview-component />
      </v-col>

      <!-- Central Area -->
      <v-col cols="6">
        <v-card>
          <h1>Central area (not implemented yet)</h1>
        </v-card>
      </v-col>

      <!-- Left Area -->
      <v-col cols="3">
        <v-card>
          <h1>Left area (not implemented yet)</h1>
          <v-card />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import GuestOverviewComponent from './GuestOverviewComponent'

  export default {
    name: 'GuestsOverviewPage',
    components: {
      GuestOverviewComponent,
    },
  }
</script>

<style>
</style>
