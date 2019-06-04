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
    background: String
  },
  computed: {
    iconName () {
      return this.name.includes('-') ? this.toCamelCase(this.name) : this.name
    },
    computedCode () {
      return this.content || this.$options.icons[this.iconName]
    },
    style () {
      return {
        fill: this.fill || 'currentColor',
        background: this.background
      }
    }
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
