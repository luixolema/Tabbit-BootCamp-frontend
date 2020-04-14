<template>
  <v-dialog
    v-model="isCheckInDialogOpen"
    persistent
    width="700"
  >
    <v-card>
      <v-toolbar
        flat
        dark
        color="primary"
      >
        <v-toolbar-title>Check in Guest</v-toolbar-title>
        <v-spacer />
        <v-menu
          bottom
          right
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn
              dark
              icon
              v-on="on"
              @click="cancel"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-menu>
      </v-toolbar>
      <v-card-text>
        <v-stepper
          v-model="step"
          non-linear
        >
          <v-stepper-header>
            <v-stepper-step
              editable
              step="1"
            >
              Personal Data
            </v-stepper-step>

            <v-divider />

            <v-stepper-step
              editable
              step="2"
            >
              Stay Related Data
            </v-stepper-step>

            <v-divider />

            <v-stepper-step
              editable
              step="3"
            >
              Dive Data
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              // content 1
            </v-stepper-content>

            <v-stepper-content step="2">
              // content 2
            </v-stepper-content>

            <v-stepper-content step="3">
              // content 3
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
      <v-card-actions class="d-flex flex-row justify-space-between">
        <v-btn
          :disabled="step==1"
          @click="step -= 1"
        >
          Back
        </v-btn>

        <v-btn
          v-if="step < 3"
          @click="step += 1"
        >
          Next
        </v-btn>
        <v-btn
          v-else
          @click="save"
        >
          CHECK IN
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  const CheckinDialogComponent = {
    props: {
      isCheckInDialogOpen: {
        type: Boolean,
        required: true,
      },
      onSave: {
        type: Function,
      },
      onCancel: {
        type: Function,
      },
    },
    data: () => ({
      stayDto: {},
      step: 1,
    }),
    methods: {
      cancel () {
        this.step = 1
        this.$emit('onCancel')
      },
      save () {
        this.step = 1
        this.$emit('onSave', this.stayDto)
      },
    },
    mounted () {
      var self = this
      window.addEventListener('keyup', function (event) {
        // If  ESC key was pressed...
        if (event.keyCode === 27) {
          self.cancel()
        }
      })
    },
  }
  export default CheckinDialogComponent
</script>

<style scoped>
  .v-stepper__header{
    box-shadow: none !important;
  }
  .v-stepper{
    box-shadow: none !important;
  }
  .v-stepper__content{
    padding: 0px 0px 0px 0px;
  }
</style>
