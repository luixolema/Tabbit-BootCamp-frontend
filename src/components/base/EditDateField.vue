<template>
  <div>
    <v-text-field
      v-model="date"
      :label="label"
      single-line
      :rules="[rules.required,rules.validDate]"
      counter
      @keyup="validateDate"
    />
    <v-date-picker
      v-model="isoDate"
      show-current="true"
    />
  </div>
</template>

<script>
  const germanDatePattern = /^([0-2]\d|3[01])\.([0]\d|1[0-2])\.\d{4}$/

  export default {
    name: 'EditDateField',

    props: {
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
      disableEditTextVariable: {
        type: Boolean,
        default: true,
      },
    },
    data: () => {
      return {
        rules: {
          required: value => !!value || 'Required.',
          validDate: value => {
            return germanDatePattern.test(value) || 'Invalid Date'
          },
        },
      }
    },
    computed: {
      isoDate: {
        get: function () {
          return this.germanTimeStringtoIsoString(this.date)
        },
        set: function (newValue) {
          this.date = this.IsoStringtoGermanTimeString(newValue)
          this.validateDate()
        },
      },
    },
    methods: {
      germanTimeStringtoIsoString (germanTimeString) {
        var parts = germanTimeString.match(/(\d+)/g)
        return new Date(parts[2], parts[1] - 1, parts[0] - (-1)).toISOString().substr(0, 10)
      },
      IsoStringtoGermanTimeString (isoDateString) {
        var parts = isoDateString.match(/(\d+)/g)
        return parts[2] + '.' + parts[1] + '.' + parts[0]
      },
      validateDate () {
        this.disableEditTextVariable = !(germanDatePattern.test(this.date))
        this.$emit('validate-field', this.disableEditTextVariable, this.property, this.date)
      },
    },
  }
</script>
