<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />
  </v-app>
</template>

<script>
  import ContextService from '../../services/ContextService'
  import NotificationService from '@/services/NotificationService'

  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar'),
      DashboardCoreDrawer: () => import('./components/core/Drawer'),
      DashboardCoreView: () => import('./components/core/View'),
    },

    data: () => ({
      expandOnHover: false,
    }),

    created () {
      ContextService.getContext()
        .then((response) =>
          this.$store.commit('contextModule/setContextData', response.data),
        )
        .catch((error) => NotificationService.error(error.message))
    },
  }
</script>
