import { useEffect, useCallback } from "react"
import MouseTooltip from "./MouseTooltip"
import skinTones from "../data/skinTones.json"

const SkinTonePicker = ({ setBody, setHead }) => {
  const setSkin = useCallback((head, body) => {
    setHead(head)
    setBody(body)
  }, [setBody, setHead]) // only rerender this when given func props change

  // set default skintone 
  useEffect(() => {
    setSkin(
      skinTones.all[0]?.head,
      skinTones.all[0]?.body,
    )
  }, [setSkin])

  const options = skinTones.all.map((skinTone) => {
    return (
      <button
        key={skinTone.name}
        onClick={() => setSkin(skinTone.head, skinTone.body)}
        className="relative w-15 aspect-square bg-[#C66C3D] rounded-md"
        style={{
          backgroundColor: skinTone.color
        }}
      >
        <MouseTooltip text={skinTone.name} />
      </button>
    )
  })

  return (
    <div className="flex items-center m-4">
      <p className="w-30">Skin Tone</p>
      <div className="flex gap-1">
        {options}
      </div>
    </div>
  )
}

export default SkinTonePicker
