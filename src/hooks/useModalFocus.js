import { useEffect, useRef } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

// While open: page behind is inert and scroll-locked, Tab cycles inside the panel, Escape closes.
// On close: focus goes back to the element in returnRef. Runs as soon as `open` flips, so the
// page is usable again while the panel plays its exit animation.
export default function useModalFocus(open, panelRef, returnRef, onClose) {
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!open) return undefined
    const root = document.getElementById('root')
    const html = document.documentElement
    const { body } = document
    const prevOverflow = html.style.overflow
    const prevPadding = body.style.paddingRight

    // keep the page from shifting when a classic scrollbar disappears
    const gutter = window.innerWidth - html.clientWidth
    html.style.overflow = 'hidden'
    if (gutter > 0) body.style.paddingRight = `${gutter}px`
    root.inert = true

    panelRef.current?.querySelector('[data-autofocus]')?.focus({ preventScroll: true })

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)]
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const current = document.activeElement
      if (!panelRef.current.contains(current)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && current === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && current === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      root.inert = false
      html.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
      returnRef.current?.focus({ preventScroll: true })
    }
  }, [open, panelRef, returnRef])
}
