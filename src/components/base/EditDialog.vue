<script>
  import VEditDialog from 'vuetify/es5/components/VDataTable/VEditDialog'

  export default {
    name: 'EditDialog',
    extends: VEditDialog,
    props: {
      disableEnter: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      genContent () {
        var _this2 = this
        return this.$createElement('div', {
          staticClass: 'v-small-dialog__content',
          ref: 'content',
          on: {
            keydown: function keydown (e) {
              var input = _this2.$refs.content.querySelector('input')
              e.keyCode === 27 && _this2.cancel()
              if (e.keyCode === 13 && input) {
                if (_this2.disableEnter) {
                } else {
                  _this2.save(input.value)
                  _this2.$emit('save')
                }
              }
            },
          },
        }, [this.$slots.input])
      },
    },
  }
</script>
