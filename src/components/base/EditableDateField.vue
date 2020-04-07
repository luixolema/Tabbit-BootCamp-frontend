<template>
  <div>
    <v-text-field
      v-model="date"
      :label="label"
      class="mt-3"
      :rules="[rules.required,rules.validDate]"
    />
    <v-date-picker
      v-model="isoDate"
      show-current="true"
    />
  </div>
</template>

<script>
  export default {
    name: 'EditableDateField',

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
    },
    data: () => {
      return {
        rules: {
          required: value => !!value || 'Required.',
          validDate: value => {
            const germanDatePattern = /^([0-2]\d|3[01])\.([0]\d|1[0-2])\.\d{4}$/
            return germanDatePattern.test(value) || 'Invalid Date'
          },
        },
      }
    },
    computed: {
      isoDate: {
        get: function () {
          this.signalDateUpdated()
          return this.germanTimeStringtoIsoString(this.date)
        },
        set: function (newValue) {
          this.date = this.IsoStringtoGermanTimeString(newValue)
          this.signalDateUpdated()
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
      signalDateUpdated () {
        this.$emit('date-updated', this.property, this.date)
      },
    },
  }
</script>
