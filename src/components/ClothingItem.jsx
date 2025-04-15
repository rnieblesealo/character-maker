import { PiProhibitBold } from "react-icons/pi";

const ClothingItem = ({ clothes, name, missingText }) => {
  return (
    <div className="flex items-center justify-start">
      <div className="relative w-15 aspect-square bg-gray-400 rounded-md p-2 flex items-center justify-center" >
        {clothes && name
          ? <img src={clothes[name]?.icon} />
          : <PiProhibitBold className="text-gray-500" />
        }
      </div>
      {name
        ? <p className="ml-4">{name}</p>
        : <p className="ml-4 text-gray-500">{missingText ?? "None"}</p>
      }
    </div>
  )
}

export default ClothingItem
