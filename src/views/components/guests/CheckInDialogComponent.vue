<template>
  <v-dialog
    v-model="open"
    persistent
    width="900"
  >
    <v-card>
      <v-card-title class="d-flex flex-row justify-space-between">
        <span class="headline">
          Check in guest
        </span>
        <span
          class="cursor-pointer"
          @click="cancel"
        >X</span>
      </v-card-title>
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
              Name of step 1
            </v-stepper-step>

            <v-divider />

            <v-stepper-step
              editable
              step="2"
            >
              Name of step 2
            </v-stepper-step>

            <v-divider />

            <v-stepper-step
              editable
              step="3"
            >
              Name of step 3
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <div class="mb-3">
                // content 1
              </div>

              <v-divider />
              <div class="d-flex flex-row justify-space-between">
                <v-btn
                  text
                  @click="cancel"
                >
                  Cancel
                </v-btn>

                <v-btn
                  @click="step = 2"
                >
                  Next
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <div class="mb-3">
                // content 2
              </div>

              <v-divider />
              <div class="d-flex flex-row justify-space-between">
                <v-btn
                  @click="step = 1"
                >
                  Previous
                </v-btn>

                <v-btn
                  @click="step = 3"
                >
                  Next
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <div class="mb-3">
                // content 3
              </div>

              <v-divider />
              <div class="d-flex flex-row justify-space-between">
                <v-btn
                  @click="step = 2"
                >
                  Previous
                </v-btn>

                <v-btn
                  color="primary"
                  @click="save"
                >
                  Save
                </v-btn>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  const CheckinDialogComponent = {
    props: {
      open: {
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
        this.$emit('onSave', this.stayDto)
      },
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
