import PropTypes from 'prop-types'
import React, { HTMLAttributes, forwardRef, useState, useMemo } from 'react'
import classNames from 'classnames'
import './CIcon.css'

export interface CIconProps extends HTMLAttributes<SVGSVGElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Use `icon={...}` instead of
   *
   * @deprecated since version 3.0
   */
  content?: string | string[]
  /**
   * Use for replacing default CIcon component classes. Prop is overriding the 'size' prop.
   */
  customClassName?: string | object | string[] // eslint-disable-line @typescript-eslint/ban-types
  /**
   * Name of the icon placed in React object or SVG content.
   */
  icon?: string | string[]
  /**
   * The height attribute defines the vertical length of an icon.
   */
  height?: number
  /**
   * Use `icon="..."` instead of
   *
   * @deprecated since version 3.0
   */
  name?: string
  /**
   * Size of the icon. Available sizes: 'sm', 'lg', 'xl', 'xxl', '3xl...9xl', 'custom', 'custom-size'.
   */
  size?:
    | 'custom'
    | 'custom-size'
    | 'sm'
    | 'lg'
    | 'xl'
    | 'xxl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl'
  /**
   * If defined component will be rendered using 'use' tag.
   */
  use?: string
  /**
   * Title tag content.
   */
  title?: string
  /**
   * The width attribute defines the horizontal length of an icon.
   */
  width?: number
}

const toCamelCase = (str: string) => {
  return str
    .replace(/([-_][a-z0-9])/gi, ($1) => {
      return $1.toUpperCase()
    })
    .replace(/-/gi, '')
}

export const CIcon = forwardRef<SVGSVGElement, CIconProps>(
  (
    { className, content, customClassName, height, icon, name, size, title, use, width, ...rest },
    ref,
  ) => {
    const [change, setChange] = useState(0)
    const _icon = icon || content || name

    if (content) {
      process &&
        process.env &&
        process.env.NODE_ENV === 'development' &&
        console.warn(
          '[CIcon] The `content` property is deprecated and will be removed in v3, please use `icon={...}` instead of.',
        )
    }
    if (name) {
      process &&
        process.env &&
        process.env.NODE_ENV === 'development' &&
        console.warn(
          '[CIcon] The `name` property is deprecated and will be removed in v3, please use `icon="..."` instead of.',
        )
    }

    useMemo(() => setChange(change + 1), [_icon, JSON.stringify(_icon)])

    const iconName = useMemo(
      () =>
        _icon && typeof _icon === 'string' && _icon.includes('-') ? toCamelCase(_icon) : _icon,
      [change],
    )

    const titleCode = title ? `<title>${title}</title>` : ''

    const code = useMemo(() => {
      if (Array.isArray(_icon)) {
        return _icon
      }
      if (typeof _icon === 'string' && React['icons']) {
        return React['icons'][iconName]
      }
    }, [change])

    const iconCode = useMemo(() => {
      return Array.isArray(code) ? code[1] || code[0] : code
    }, [change])

    const scale = (() => {
      return Array.isArray(code) && code.length > 1 ? code[0] : '64 64'
    })()

    const viewBox = (() => {
      return rest['viewBox'] || `0 0 ${scale}`
    })()

    // render

    const _className = customClassName
      ? classNames(customClassName)
      : classNames(
          'icon',
          {
            [`icon-${size}`]: size,
            [`icon-custom-size`]: height || width,
          },
          className,
        )

    return use ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={_className}
        {...(height && { height: height })}
        {...(width && { width: width })}
        role="img"
        {...rest}
        ref={ref}
      >
        <use href={use}></use>
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        className={_className}
        {...(height && { height: height })}
        {...(width && { width: width })}
        role="img"
        dangerouslySetInnerHTML={{ __html: titleCode + iconCode }}
        {...rest}
        ref={ref}
      />
    )
  },
)

CIcon.propTypes = {
  className: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  customClassName: PropTypes.string,
  height: PropTypes.number,
  icon: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  name: PropTypes.string,
  size: PropTypes.oneOf([
    'custom',
    'custom-size',
    'sm',
    'lg',
    'xl',
    'xxl',
    '3xl',
    '4xl',
    '5xl',
    '6xl',
    '7xl',
    '8xl',
    '9xl',
  ]),
  title: PropTypes.any,
  use: PropTypes.any,
  width: PropTypes.number,
}

CIcon.displayName = 'CIcon'
