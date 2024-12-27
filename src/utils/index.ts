import { twMerge } from 'tailwind-merge'
import classnames, { ArgumentArray } from 'classnames'

export function el(className: string, root: HTMLElement = document.body) {
  return root.querySelector(`.${className}`) as HTMLElement
}

export function els(className: string, root: HTMLElement = document.body) {
  return Array.from(root.querySelectorAll(`.${className}`))
}

export function cn(...css: ArgumentArray) {
  return twMerge(classnames(...css))
}
