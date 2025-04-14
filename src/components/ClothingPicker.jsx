import { FaCircleXmark } from "react-icons/fa6"

const ClothingPicker = ({ clothes, name, set }) => {
  const buttons = Object.entries(clothes).map(([name, details]) => {
    return (
      <button key={name} className="w-15 aspect-square bg-gray-400 rounded-md p-2" onClick={() => set(details.asset)}>
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
        <button className="w-15 aspect-square bg-gray-400 rounded-md p-2 flex items-center justify-center text-gray-500" onClick={() => set("")}>
          <FaCircleXmark />
        </button>
        {buttons}
      </div>
    </div>
  )
}

export default ClothingPicker
