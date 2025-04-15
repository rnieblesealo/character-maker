import clsx from "clsx"

import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import allHairstyles from "../data/hairstyles.json"
import allPants from "../data/pants.json"
import allSkinTones from "../data/skinTones.json"
import allTops from "../data/tops.json"

import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

import BodyPart from "./BodyPart"
import ClothingPart from "./ClothingPart"

const CharacterViewer = ({
  id,
  name,
  skinTone,
  hair,
  top,
  pants,
  hero
}) => {
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    console.log(hovered)
  }, [hovered])

  const navigate = useNavigate() // used instead of link due to nested div

  const width = clsx(!hero ? "w-40" : "w-50")
  const textSize = clsx(!hero ? "text-2xl" : "text-4xl")
  const extra = clsx(!hero && "cursor-pointer border-1 p-2 rounded-lg transition-all duration-[100ms] hover:border-red-500") // 200ms used to match style bracket, required for hover text color change

  // workaround used here to color text red when entire div is hovered
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/view/${id}`)}
      className={`${extra} w-min h-min flex flex-col items-center justify-start`}
    >
      <div className={`${width} relative bg-gray-400 aspect-square rounded-lg`}>
        <ClothingPart from={allHairstyles} keyName={hair} z={5} />

        <BodyPart from={allSkinTones} colorKey={skinTone} partKey="head" z={4} />

        <ClothingPart from={allTops} keyName={top} z={3} />
        <ClothingPart from={allPants} keyName={pants} z={2} />

        <BodyPart from={allSkinTones} colorKey={skinTone} partKey="body" z={1} />
      </div>

      {name &&
        <p
          className={`text-white ${textSize} text-center mt-2`}
          style={{
            color: !hero && hovered && "#EF4444"
          }}
        >{name}
        </p>
      }

      {hovered && !hero &&
        <div className="flex w-full gap-2">
          <button className="w-full rounded-sm bg-red-800 flex items-center justify-center text-lg p-2">
            <FaTrash />
          </button>
          <button className="w-full rounded-sm bg-amber-800 flex items-center justify-center text-lg p-2">
            <FaPencilAlt />
          </button>
        </div>
      }

    </div>
  )
}

export default CharacterViewer;
