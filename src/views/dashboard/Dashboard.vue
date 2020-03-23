<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <router-link
          to="/pages/guests"
        >
          <base-material-stats-card
            color="info"
            icon="mdi-account-multiple"
            title="Guests"
            value="25"
            sub-icon="mdi-clock"
            sub-text="Just Updated"
          />
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
  }
</script>
