import { useState, useLayoutEffect } from 'react'

export const useDOMRect = (default_value = new DOMRectReadOnly()) => {
  const [element, ref] = useState()
  const [dimensions, set_dimensions] = useState(default_value)

  useLayoutEffect(() => {
    if (!element) return
    set_dimensions(element.getBoundingClientRect())
    const resizeObserver = new ResizeObserver(() => {
      set_dimensions(element.getBoundingClientRect())
    })
    resizeObserver.observe(element)
    return () => resizeObserver.disconnect()
  }, [element])

  return { ref, dimensions, element }
}
