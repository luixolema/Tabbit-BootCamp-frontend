<template>
  <div>
    <v-text-field
      v-model="inputDate"
      :label="label"
      :rules="computedRules"
      append-icon="mdi-calendar"
      @click:append="dateDialog=true"
      @change="$emit('date-updated', property, inputDate)"
    />
    <v-dialog
      v-model="dateDialog"
      max-width="340"
    >
      <v-card>
        <v-card-text class="pt-1">
          <base-editable-date-field
            :date="inputDate"
            :label="label"
            :property="property"
            @date-updated="signalDateUpdated"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import validations from '../formUtils/Validations'
  export default {
    name: 'Datepicker',
    props: {
      required: {
        type: Boolean,
        default: false,
      },
      date: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
      property: {
        type: String,
        default: '',
      },
      rules: {
        type: Array,
        default: () => ([]),
      },
    },
    data: () => {
      return {
        dateDialog: false,
        inputDate: '',
        tempDate: '',
        validations,
      }
    },
    computed: {
      computedRules () {
        var ruleArray = []
        if (this.required) {
          ruleArray = [validations.required()]
        }
        return ruleArray.concat([validations.date()]).concat(this.rules)
      },
    },
    watch: {
      inputDate (newInputDate, oldInputDate) {
        this.tempDate = newInputDate
      },
      date (newDate, oldDate) {
        this.inputDate = newDate
      },
    },
    mounted () {
      this.inputDate = this.date
      this.tempDate = this.date
      var self = this
      window.addEventListener('keyup', function (event) {
        // If enter key was pressed...
        if (event.keyCode === 13) {
          if (self.dateDialog) {
            self.dateDialog = false
            self.inputDate = self.tempDate
            self.$emit('date-updated', self.property, self.inputDate)
          }
        }
      })
    },
    methods: {
      signalDateUpdated (property, value) {
        this.tempDate = value
      },
    },
  }
</script>
