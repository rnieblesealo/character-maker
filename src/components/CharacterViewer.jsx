import clsx from "clsx"

import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import allHairstyles from "../data/hairstyles.json"
import allPants from "../data/pants.json"
import allSkinTones from "../data/skinTones.json"
import allTops from "../data/tops.json"

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
  const extra = clsx(!hero && "cursor-pointer border-1 p-2 rounded-lg transition-scale duration-[100ms] hover:scale-[105%] hover:shadow-lg hover:border-red-500") // 200ms used to match style bracket, required for hover text color change

  const ClothingItem = ({ from, keyName, z }) => {
    if (keyName in from && from[keyName].asset) {
      return (
        <img
          src={from[keyName].asset}
          className="absolute"
          style={{
            zIndex: z
          }}
        />
      )
    } else {
      return null
    }
  }

  const BodyPart = ({ from, colorKey, partKey, z }) => {
    if (colorKey in from && partKey in from[colorKey]) {
      return (
        <img
          src={from[colorKey][partKey]}
          className="absolute"
          style={{
            zIndex: z
          }}
        />
      )
    } else {
      return null;
    }
  }

  // workaround used here to color text red when entire div is hovered
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/view/${id}`)}
      className={`${extra} w-min flex flex-col items-center justify-center`}
    >
      <div className={`${width} relative bg-gray-400 aspect-square rounded-lg`}>

        <ClothingItem from={allHairstyles} keyName={hair} z={5} />

        <BodyPart from={allSkinTones} colorKey={skinTone} partKey="head" z={4} />

        <ClothingItem from={allTops} keyName={top} z={3} />
        <ClothingItem from={allPants} keyName={pants} z={2} />

        <BodyPart from={allSkinTones} colorKey={skinTone} partKey="body" z={1} />

      </div>
      {name &&
        <p
          className={`text-white ${textSize} text-center mt-2`}
          style={{
            transition: "color 100ms ease-in-out",
            color: !hero && hovered && "#EF4444"
          }}
        >{name}
        </p>
      }
    </div>
  )
}

export default CharacterViewer;
