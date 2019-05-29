<template>
  <svg width="64" height="64" v-html="computedCode"></svg>
</template>

<script>
export default {
  name: 'CIcon',
  icons: {},
  props: {
    iconCode: String,
    icon: String
  },
  mounted () {
    console.log(this.$options.icons)
  },
  computed: {
    computedCode () {
      return this.iconCode || this.$options.icons[this.icon]
    }
  }
}
</script>
