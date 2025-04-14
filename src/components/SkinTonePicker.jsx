import { useEffect, useCallback } from "react"
import MouseTooltip from "./MouseTooltip"

const SkinTonePicker = ({ setBody, setHead }) => {
  const heads = {
    black: "/bodyparts/b_head.png",
    tan: "/bodyparts/h_head.png",
    white: "/bodyparts/w_head.png"
  }

  const bodies = {
    black: "/bodyparts/b_body.png",
    tan: "/bodyparts/h_body.png",
    white: "/bodyparts/w_body.png"
  }

  const setSkin = useCallback((head, body) => {
    setHead(head)
    setBody(body)
  }, [setBody, setHead]) // only rerender this when given func props change

  useEffect(() => {
    setSkin(heads.tan, bodies.tan) // set defaults
  }, [bodies.tan, heads.tan, setSkin])

  return (
    <div className="flex items-center m-4">
      <p className="w-30">Skin Tone</p>
      <div className="flex gap-1">
        <button className="relative w-15 aspect-square bg-[#C66C3D] rounded-md" onClick={() => setSkin(heads.tan, bodies.tan)}>
          <MouseTooltip text="Tan" />
        </button>
        <button className="relative w-15 aspect-square bg-[#903B24] rounded-md" onClick={() => setSkin(heads.black, bodies.black)}>
          <MouseTooltip text="Black" />
        </button>
        <button className="relative w-15 aspect-square bg-[#F19C64] rounded-md" onClick={() => setSkin(heads.white, bodies.white)}>
          <MouseTooltip text="White" />
        </button>
      </div>
    </div>
  )
}

export default SkinTonePicker
