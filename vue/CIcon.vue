<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :class="computedClasses"
    v-html="icon.svgContent"
  ></svg>
</template>

<script>
export default {
  name: 'CIcon',
  //This object contains icons added before component registration
  icons: {},
  props: {
    name: String,
    content: [String, Array],
    // fill: String,
    // background: String,
    size: {
      type: String,
      validator: size => ['sm', 'lg', 'xl', 'custom-size'].includes(size)
    },
    customClasses: String
  },
  computed: {
    iconName () {
      const iconNameIsKebabCase = this.name && this.name.includes('-')
      return iconNameIsKebabCase ? this.toCamelCase(this.name) : this.name
    },
    code () {
      return this.content || this.$options.icons[this.iconName]
    },
    icon () {
      if (Array.isArray(this.code)) {
        const coordinates = this.code.length > 1 ? this.code[0] : '64 64'
        const svgContent = this.code.length > 1 ? this.code[1] : this.code[0]
        return { coordinates, svgContent }
      }
      return { coordinates: '64 64', svgContent: this.code }
    },
    viewBox () {
      return this.$attrs.viewBox || `0 0 ${ this.icon.coordinates }`
    },
    // style () {
    //   return {
    //     fill: this.fill || 'currentColor',
    //     background: this.background
    //   }
    // },
    computedSize () {
      return this.$attrs.width || this.$attrs.height ? 'custom-size' : this.size
    },
    computedClasses () {
      return this.customClasses ||  `c-icon c-icon-${this.computedSize}`
    }
  },
  methods: {
    toCamelCase (str) {
      return str.replace(/([-_][a-z0-9])/ig, ($1) => {
        return $1.toUpperCase().replace('-', '')
      })
    }
  }
}
</script>
