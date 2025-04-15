import clsx from "clsx"

import allHairstyles from "../data/hairstyles.json"
import allPants from "../data/pants.json"
import allSkinTones from "../data/skinTones.json"
import allTops from "../data/tops.json"

const CharacterViewer = ({
  name,
  skinTone,
  hair,
  top,
  pants,
  hero
}) => {
  const width = clsx(!hero ? "w-30" : "w-50")
  const textSize = clsx(!hero ? "text-2xl" : "text-4xl")
  const extra = clsx(!hero && "border-1 p-2 rounded-lg")

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

  return (
    <div className={`${extra} flex flex-col items-center justify-center`}>
      <div className={`${width} relative bg-gray-400 aspect-square rounded-lg`}>

        <ClothingItem from={allHairstyles} keyName={hair} z={5} />

        <BodyPart from={allSkinTones} colorKey={skinTone} partKey="head" z={4} />

        <ClothingItem from={allTops} keyName={top} z={3} />
        <ClothingItem from={allPants} keyName={pants} z={2} />

        <BodyPart from={allSkinTones} colorKey={skinTone} partKey="body" z={1} />

      </div>
      {name &&
        <p className={`${textSize} text-center mt-2`}>{name}</p>
      }
    </div>
  )
}

export default CharacterViewer;
