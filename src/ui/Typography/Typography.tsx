import classNames from 'classnames'
import React from 'react'

export const variants = {
  'paragraph-large': {
    tag: 'p',
    style: 'text-paragraph-large',
  },
  paragraph: {
    tag: 'p',
    style: 'text-paragraph',
  },
  'paragraph-small': {
    tag: 'p',
    style: 'text-paragraph-small',
  },
  body: {
    tag: 'p',
    style: 'text-body',
  },
  'caption-1': {
    tag: 'span',
    style: 'text-caption-1',
  },
  'caption-2': {
    tag: 'span',
    style: 'text-caption-2',
  },
  'caption-3': {
    tag: 'span',
    style: 'text-caption-3',
  },
  'title-1': {
    tag: 'h1',
    style: 'text-title-1',
  },
  'title-2': {
    tag: 'h2',
    style: 'text-title-2',
  },
  'title-3': {
    tag: 'h3',
    style: 'text-title-3',
  },
  'title-4': {
    tag: 'h4',
    style: 'text-title-4',
  },
  'title-5': {
    tag: 'h5',
    style: 'text-title-5',
  },
  'subtitle-6': {
    tag: 'h6',
    style: 'text-subtitle-6',
  },
  button: {
    tag: 'span',
    style: 'text-button',
  },
  'button-small': {
    tag: 'span',
    style: 'text-button-small',
  },
}

export interface TypographyProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  variant:
    | 'title-1'
    | 'title-2'
    | 'title-3'
    | 'title-4'
    | 'title-5'
    | 'subtitle-6'
    | 'body'
    | 'paragraph'
    | 'paragraph-small'
    | 'paragraph-large'
    | 'caption-1'
    | 'caption-2'
    | 'caption-3'
    | 'button'
    | 'button-small'
  className?: string
  italic?: boolean
  underline?: boolean
  children: React.ReactNode
}

export function Typography({
  as,
  variant,
  className,
  italic,
  underline,
  children,
}: TypographyProps) {
  const Tag = as ?? (variants[variant].tag as keyof JSX.IntrinsicElements)

  return (
    <Tag
      className={classNames(
        className,
        variants[variant].style,
        { italic },
        { underline }
      )}
    >
      {children}
    </Tag>
  )
}

Typography.defaultProps = {
  as: undefined,
  className: undefined,
  italic: false,
  underline: false,
}
