import { useEffect, useCallback } from "react"
import MouseTooltip from "./MouseTooltip"
import skinTones from "../data/skinTones.json"

const SkinTonePicker = ({ setBody, setHead }) => {
  const setSkin = useCallback((head, body) => {
    setHead(head)
    setBody(body)
  }, [setBody, setHead]) // only rerender this when given func props change

  // set default skintone to first key's 
  useEffect(() => {
    const keys = Object.keys(skinTones)

    const firstHead = skinTones[keys[0]]?.head
    const firstBody = skinTones[keys[0]]?.body

    if (!firstHead || !firstBody){
      return;
    }
  
    setSkin(firstHead, firstBody)

  }, [setSkin])

  const options = Object.entries(skinTones).map(([name, details]) => {
    return (
      <button
        key={name}
        onClick={() => setSkin(details.head, details.body)}
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
