import { useEffect, useRef, useCallback, useState } from "react"

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const isHoveringRef = useRef(false)
  const rafRef = useRef(null)
  // probed once (not on every render) with the SAME query the CSS uses —
  // index.css only hides the OS cursor under (hover: hover) and (pointer: fine),
  // so mounting the custom cursor under any other query would show both
  const [canHover] = useState(
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches
  )

  // Position uses the standalone `translate` property so it can be updated on
  // every frame without clobbering the hover `scale` (the old code wrote a
  // combined `transform`, so moving the mouse snapped the ring back to scale 1).
  const updatePosition = useCallback(() => {
    rafRef.current = null
    if (!cursorRef.current || !dotRef.current) return

    const { x, y } = mouseRef.current
    cursorRef.current.style.translate = `${x - 16}px ${y - 16}px`
    dotRef.current.style.translate = `${x - 4}px ${y - 4}px`
    cursorRef.current.style.opacity = "1"
    dotRef.current.style.opacity = "1"
  }, [])

  useEffect(() => {
    if (!canHover) return undefined

    // hides the OS cursor (see index.css) — only while this component is mounted
    document.documentElement.classList.add("has-custom-cursor")

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updatePosition)
      }
    }

    const handleMouseOver = (e) => {
      const target = e.target
      // note: index.css hides the OS cursor with `cursor: none !important`, so a
      // getComputedStyle(...).cursor check would never match here anyway;
      // text fields count as interactive so typing targets still get feedback
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input, textarea, select, [contenteditable]") ||
        target.classList.contains("glass-card")

      if (isHoveringRef.current !== isInteractive) {
        isHoveringRef.current = isInteractive
        if (cursorRef.current) {
          cursorRef.current.style.scale = isInteractive ? "1.5" : "1"
          cursorRef.current.style.backgroundColor = isInteractive ? "rgba(59, 130, 246, 0.2)" : "transparent"
          cursorRef.current.style.borderColor = isInteractive ? "rgba(139, 92, 246, 0.8)" : "rgb(59, 130, 246)"
        }
        if (dotRef.current) {
          dotRef.current.style.scale = isInteractive ? "0" : "1"
        }
      }
    }

    const handleMouseOut = (e) => {
      // pointer left the window (no related target) — hide the ring instead
      // of freezing it on screen until the mouse comes back
      if (!e.relatedTarget && cursorRef.current && dotRef.current) {
        cursorRef.current.style.opacity = "0"
        dotRef.current.style.opacity = "0"
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
      document.documentElement.classList.remove("has-custom-cursor")
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updatePosition, canHover])

  if (!canHover) {
    return null
  }

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 border-2 border-blue-500 rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        style={{
          width: "32px",
          height: "32px",
          opacity: 0,
          transition: "background-color 0.3s, border-color 0.3s, scale 0.3s, opacity 0.2s",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          width: "8px",
          height: "8px",
          opacity: 0,
          transition: "translate 0.15s ease-out, scale 0.15s ease-out, opacity 0.2s",
        }}
      />
    </>
  )
}

export default CustomCursor
