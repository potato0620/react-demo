export function el(className: string, root: HTMLElement = document.body) {
  return root.querySelector(`.${className}`) as HTMLElement
}

export function els(className: string, root: HTMLElement = document.body) {
  return Array.from(root.querySelectorAll(`.${className}`))
}
