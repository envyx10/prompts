import { useEffect, useRef } from 'react'

const GAP            = 32   // matches Tailwind's 8-unit (8px × 4 = 32px)
const DOT_R          = 0.85
const MOUSE_RADIUS   = 180
const MOUSE_STRENGTH = 5
const AMBIENT_AMP    = 0.7

export default function InteractiveDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let w = 0, h = 0, cols = 0, rows = 0
    let ox = 0, oy = 0
    const mouse    = { x: -9999, y: -9999 }   // raw cursor position
    const smoothed = { x: -9999, y: -9999 }   // lerped position
    const LERP = 0.06                          // lower = more delay
    let raf = 0
    let t = 0

    function resize() {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      const dpr = window.devicePixelRatio || 1
      canvas.width  = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / GAP) + 2
      rows = Math.ceil(h / GAP) + 2
      // Center the grid so dots are symmetric around the section center
      ox = (w % GAP) / 2
      oy = (h % GAP) / 2
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    function onMouseLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    function draw() {
      t += 0.008

      // Lerp smoothed position toward real mouse each frame
      smoothed.x += (mouse.x - smoothed.x) * LERP
      smoothed.y += (mouse.y - smoothed.y) * LERP

      ctx.clearRect(0, 0, w, h)

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const bx = ox + col * GAP
          const by = oy + row * GAP

          const ambient = Math.sin(t * 0.6 + col * 0.3 + row * 0.12) * AMBIENT_AMP

          const dx   = bx - smoothed.x
          const dy   = by - smoothed.y
          const dist = Math.hypot(dx, dy)

          let dotX = bx, dotY = by + ambient
          let alpha = 0.10

          if (dist < MOUSE_RADIUS && dist > 0) {
            const falloff = 1 - dist / MOUSE_RADIUS
            const wave    = Math.sin(dist * 0.055 - t * 2.5) * falloff * MOUSE_STRENGTH
            const angle   = Math.atan2(dy, dx)
            dotX  = bx + Math.cos(angle) * wave
            dotY  = by + ambient + Math.sin(angle) * wave
            alpha = 0.10 + falloff * 0.18
          }

          ctx.beginPath()
          ctx.arc(dotX, dotY, DOT_R, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(161,161,170,${alpha})`
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize',    resize)
    window.addEventListener('mousemove', onMouseMove)
    canvas.parentElement?.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize',    resize)
      window.removeEventListener('mousemove', onMouseMove)
      canvas.parentElement?.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)',
      }}
    />
  )
}
