<script>
  import VEditDialog from 'vuetify/es5/components/VDataTable/VEditDialog'
  import VMenu from 'vuetify/es5/components/VMenu/VMenu'

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
              var label = _this2.$refs.content.querySelector('label')
              var isValid = label.className.search('error--text') < 0
              var input = _this2.$refs.content.querySelector('input')
              e.keyCode === 27 && _this2.cancel()
              if (e.keyCode === 13 && input) {
                if (isValid) {
                  _this2.save(input.value)
                  _this2.$emit('save')
                }
              }
            },
          },
        }, [this.$slots.input])
      },
    },
    render: function render (h) {
      var _this3 = this

      return h(VMenu, {
        staticClass: 'v-small-dialog',
        class: this.themeClasses,
        props: {
          contentClass: 'v-small-dialog__menu-content',
          transition: this.transition,
          origin: 'top right',
          right: true,
          value: this.isActive,
          closeOnClick: !this.persistent,
          closeOnContentClick: false,
          eager: this.eager,
          light: this.light,
          dark: this.dark,
        },
        on: {
          input: function input (val) {
            return (_this3.isActive = val)
          },
        },
        scopedSlots: {
          activator: function activator (_ref) {
            var on = _ref.on
            on.dblclick = on.click
            delete on.click
            return h('div', {
              staticClass: 'v-small-dialog__activator koko',
              on: on,
            }, [h('span', {
              staticClass: 'v-small-dialog__activator__content',
            }, _this3.$slots.default)])
          },
        },
      }, [this.genContent(), this.large ? this.genActions() : null])
    },
  }
</script>
