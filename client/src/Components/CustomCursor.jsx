import { useEffect, useRef, useCallback } from "react"

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const isHoveringRef = useRef(false)
  const rafRef = useRef(null)

  const updatePosition = useCallback(() => {
    if (!cursorRef.current || !dotRef.current) return

    const { x, y } = mouseRef.current
    cursorRef.current.style.transform = `translate(${x - 16}px, ${y - 16}px)`
    dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`
    rafRef.current = null
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updatePosition)
      }
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("glass-card") ||
        getComputedStyle(target).cursor === "pointer"

      if (isHoveringRef.current !== isInteractive) {
        isHoveringRef.current = isInteractive
        if (cursorRef.current) {
          cursorRef.current.style.transform = isInteractive
            ? `translate(${mouseRef.current.x - 32}px, ${mouseRef.current.y - 32}px) scale(1.5)`
            : `translate(${mouseRef.current.x - 16}px, ${mouseRef.current.y - 16}px) scale(1)`
          cursorRef.current.style.backgroundColor = isInteractive ? "rgba(59, 130, 246, 0.2)" : "transparent"
          cursorRef.current.style.borderColor = isInteractive ? "rgba(139, 92, 246, 0.8)" : "rgb(59, 130, 246)"
        }
        if (dotRef.current) {
          dotRef.current.style.transform = `translate(${mouseRef.current.x - 4}px, ${mouseRef.current.y - 4}px) scale(${isInteractive ? 0 : 1})`
        }
      }
    }

    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
      return
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updatePosition])

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 border-2 border-blue-500 rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        style={{
          width: "32px",
          height: "32px",
          transition: "background-color 0.3s, border-color 0.3s",
          transform: "translate(0, 0)",
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          width: "8px",
          height: "8px",
          transition: "transform 0.15s ease-out",
          transform: "translate(0, 0)",
        }}
      />
    </>
  )
}

export default CustomCursor
