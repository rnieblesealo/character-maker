import { useEffect } from "react"
import MouseTooltip from "./MouseTooltip"

const SkinTonePicker = ({ skinTones, set }) => {
  // set default skintone to first available key 
  useEffect(() => {
    const keys = Object.keys(skinTones)

    if (keys.length > 0) {
      const first = keys[0]
      set(first)
    }
  }, [set, skinTones])

  const options = Object.entries(skinTones).map(([name, details]) => {
    return (
      <button
        key={name}
        onClick={() => set(name)}
        className="relative w-15 aspect-square bg-[#C66C3D] rounded-md"
        style={{
          backgroundColor: details.color
        }}
      >
        <MouseTooltip text={name} />
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
