<p align="center">
  <a href="https://coreui.io/">
    <img src="https://coreui.io/images/brand/coreui-icons.svg" alt="CoreUI Icons logo" height="50">
  </a>
</p>

<p align="center">
  Official Vue.js component for CoreUI Icons and CoreUI Icons PRO.
  <br>
  <a href="https://coreui.io/vue/docs/components/icon.html"><strong>Explore CoreUI Icons for Vue docs »</strong></a>
  <br>
  <br>
  <a href="https://github.com/coreui/coreui-icons/issues/new?template=bug_report.md">Report bug</a>
  ·
  <a href="https://github.com/coreui/coreui-icons/issues/new?template=feature_request.md">Request feature</a>
  ·
  <a href="https://blog.coreui.io/">Blog</a>
</p>



## Status

[![NPM](https://img.shields.io/npm/v/@coreui/icons-vue/latest?style=flat-square&color=brightgreen)][coreui]
[![Downloads](https://img.shields.io/npm/dm/@coreui/icons-vue.svg?style=flat-square)][coreui]
[![License](https://img.shields.io/npm/l/@coreui/vue?style=flat-square)][coreui]

[coreui]: https://coreui.io/icons


## Installation

```bash
npm install @coreui/icons
npm install @coreui/icons-vue
```

or

```bash
yarn add @coreui/icons
yarn add @coreui/icons-vue
```

## Use

### Single icon

```jsx
import { CIcon } from '@coreui/icons-vue';
import { cifAu } from '@coreui/icons';

...
<CIcon :icon="cilAu" size="xxl"/>
...
```

### All icons

```jsx
import { CIcon } from '@coreui/icons-vue';
import * as icon from '@coreui/icons';

...
<CIcon :icon="icon.cilList" size="xxl"/>
...
```

## API

| property | type | description |
| --- | --- | --- |
| customClassName | `string` \| `object` \| `string[]` | Use for replacing default CIcon component classes. Prop is overriding the 'size' prop. |
| icon | `string` \| `string[]` | Name of the icon placed in React object or SVG content. |
| height | `number` | The height attribute defines the vertical length of an icon. |
| size | `sm` \| `md` \|`lg` \| `xl` \| `xxl` \| `3xl` \| `4xl` \| `5xl` \| `6xl` \| `7xl` \| `8xl` \| `9xl` | Size of the icon. |
| use | `string` | If defined component will be rendered using `use` tag. |
| title | `string` | Title tag content. |
| width | `number` | The width attribute defines the horizontal length of an icon. |
