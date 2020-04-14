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
