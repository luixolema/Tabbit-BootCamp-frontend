<template>
  <v-data-table
    height="24vh"
    :headers="headers"
    :items="tableItems"
    :hide-default-footer="true"
    :disable-pagination="true"
    :fixed-header="true"
  >
    <template v-slot:item.value="props">
      <base-edit-dialog
        v-if="!disableEdit"
        :return-value.sync="props.item.value"
        @save="$emit('item-updated', props.item.property, props.item.value)"
      >
        <!--if its option type, show the text of the option instead of the value-->
        <span
          v-if="props.item.type==='select'"
        >
          <div
            v-for="(option, index) in props.item.options"
            :key="index"
          >
            <span v-if="(props.item.value+'') === option.value ">
              {{ option.text }}
            </span>
          </div>
        </span>
        <!--else just show the normal value-->
        <span v-else>
          {{ props.item.value }}
        </span>

        <template v-slot:input>
          <base-editable-date-field
            v-if="props.item.type==='date'"
            :date="props.item.value"
            :label="props.item.key"
            :property="props.item.property"
            @date-updated="updateDateField"
          />
          <v-text-field
            v-if="props.item.type==='text'"
            v-model="props.item.value"
            :label="props.item.key"
            :rules="[validations.required()]"
            :error-messages="props.item.errors"
            maxlength="400"
            counter
          />
          <v-text-field
            v-if="props.item.type==='number'"
            v-model="props.item.value"
            :label="props.item.key"
            type="number"
            :rules="[validations.required(), validations.checkPositiveNumber()]"
            :error-messages="props.item.errors"
          />
          <v-text-field
            v-if="props.item.type==='email'"
            v-model="props.item.value"
            :label="props.item.key"
            :rules="[validations.required(), validations.email()]"
            :error-messages="props.item.errors"
          />
          <v-text-field
            v-if="props.item.type==='fixed'"
            v-model="props.item.value"
            :label="props.item.key"
            disabled="true"
          />
          <v-text-field
            v-show="false"
            v-if="props.item.type==='select'"
            v-model="props.item.value"
          />
          <v-select
            v-if="props.item.type==='select'"
            v-model="props.item.value"
            item-text="text"
            item-value="value"
            :items="props.item.options"
            :label="props.item.key"
            :error-messages="props.item.errors"
          />
        </template>
      </base-edit-dialog>
      <span v-else>{{ props.item.value }}</span>
    </template>
  </v-data-table>
</template>

<script>
  import validations from '../../components/formUtils/Validations'
  export default {
    name: 'EditableDataTable',
    props: {
      tableItems: {
        type: Array,
        default: () => ([]),
      },
      headers: {
        type: Array,
        default: () => ([]),
      },
      disableEdit: {
        type: Boolean,
        default: false,
      },
    },
    data: () => {
      return {
        validations,
        rules: {
          required: value => (!!value && value.match(/^ *$/) === null) || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          nonNegative: value => value >= 0 || 'The number can not be negative',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail'
          },
        },
      }
    },
    computed: {
      stayDataInStore () {
        return this.$store.state.stayModule.stayData
      },
    },
    methods: {
      updateDateField (property, value) {
        var foundItemIndex = this.tableItems.findIndex((tableItem) => { return tableItem.property === property })
        this.tableItems[foundItemIndex].value = value
      },
    },
  }
</script>
