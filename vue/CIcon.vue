<template>
  <svg
    viewBox="0 0 64 64"
    :style="style"
    v-html="computedCode"
  ></svg>
</template>

<script>
export default {
  name: 'CIcon',
  //This object contains icons added before component registration
  icons: {},
  props: {
    name: String,
    content: String,
    fill: String,
    background: String,
    // height: String,
    // width: String
  },
  data () {
    return {
      lineHeight: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.lineHeight = window.getComputedStyle(this.$el, null).getPropertyValue('line-height')
    })
  },
  computed: {
    iconName () {
      return this.name.includes('-') ? this.toCamelCase(this.name) : this.name
    },
    computedCode () {
      return this.content || this.$options.icons[this.iconName]
    },
    autoDimensions () {
      const noDimensions = !this.$attrs.height && !this.$attrs.width
      return noDimensions ? { height: this.lineHeight } : {}
    },
    style () {
      return Object.assign({}, this.autoDimensions, {
        fill: this.fill || 'currentColor',
        background: this.background
      })
    },

  },
  methods: {
    toCamelCase (str) {
      return str.replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase().replace('-', '')
      })
    }
  }
}
</script>
