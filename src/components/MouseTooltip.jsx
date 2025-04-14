import { useState, useRef } from "react"

const MouseTooltip = ({ text }) => {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  const textBox = useRef(null)

  function handleMouseMove(e) {
    setVisible(true)
    setPos({
      top: e.clientY, // make pos match mouse 
      left: e.clientX
    })
  }

  function handleMouseLeave() {
    setVisible(false)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute top-0 left-0 w-full h-full z-20 text-center"
    >
      {visible && (
        <div
          ref={(me) => textBox.current = me}
          style={{
            top: pos.top + 10,
            left: pos.left + 10
          }}
          className="fixed bg-indigo-950 px-2 rounded-lg text-2xl"
        >
          {text}
        </div>
      )}
    </div>
  )
}

export default MouseTooltip
