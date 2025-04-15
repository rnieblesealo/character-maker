import { PiProhibitBold } from "react-icons/pi";
import MouseTooltip from "./MouseTooltip"

const ClothingPicker = ({ clothes, name, set }) => {
  const buttons = Object.entries(clothes).map(([name, details]) => {
    return (
      <button key={name} className="relative w-15 aspect-square bg-gray-400 rounded-md p-2" onClick={() => set(name)}>
        <MouseTooltip text={name} />
        <img
          src={details.icon}
        />
      </button>
    )
  })

  return (
    <div className="flex items-center m-4">
      <p className="w-30 text-left">{name}</p>
      <div className="flex gap-1">
        <button className="relative w-15 aspect-square bg-gray-400 rounded-md p-2 flex items-center justify-center" onClick={() => set("")}>
          <MouseTooltip text="None" />
          <span className="text-gray-500">
            <PiProhibitBold />
          </span>
        </button>
        {buttons}
      </div>
    </div>
  )
}

export default ClothingPicker
