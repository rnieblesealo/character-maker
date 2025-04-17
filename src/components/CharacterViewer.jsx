import clsx from "clsx"

import { useNavigate } from "react-router-dom"
import { useState } from "react"

import allHairstyles from "../data/hairstyles.json"
import allPants from "../data/pants.json"
import allSkinTones from "../data/skinTones.json"
import allTops from "../data/tops.json"

import supabase from "../scripts/client"

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
  hero,
  setLastUpdateTime
}) => {
  const navigate = useNavigate() // used instead of link due to nested div

  const [hovered, setHovered] = useState(false)
  const [deleteInProgress, setDeleteInProgress] = useState(false)

  async function handleDeleteCharacter(e) {
    e.preventDefault()

    setDeleteInProgress(true)

    await supabase
      .from("characters")
      .delete()
      .eq("id", id)

    setLastUpdateTime(Date.now())
  }

  const width = clsx(!hero ? "w-40" : "w-50")
  const textSize = clsx(!hero ? "text-2xl" : "text-4xl")
  const nonHeroExtras = clsx(
    !hero && "cursor-pointer border-1 p-2 rounded-lg hover:border-red-500",
    deleteInProgress && "grayscale" // used to indicate blocking interaction
  )

  // workaround used here to color text red when entire div is hovered
  // also need to click on user card to actually go even if entire thing's hover mode triggers
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${nonHeroExtras} w-min h-min flex flex-col items-center justify-start saturation-0`}
    >
      <div
        className={`${width} relative bg-gray-400 aspect-square rounded-lg`}
        onClick={() => {
          if (!hero) {
            navigate(`/view/${id}`)
          }
        }}
      >
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
        >
          {hero && <span className="text-gray-500">"</span>}
          {name}
          {hero && <span className="text-gray-500">"</span>}
        </p>
      }

      {hovered && !hero &&
        <div className="flex w-full gap-2">
          <button
            className="w-full rounded-sm bg-red-800 hover:bg-red-900 active:bg-red-950 flex items-center justify-center text-lg p-2 cursor-pointer"
            onClick={handleDeleteCharacter}
          >
            <FaTrash />
          </button>
          <button
            className="w-full rounded-sm bg-amber-800 hover:bg-amber-900 active:bg-amber-950 flex items-center justify-center text-lg p-2 cursor-pointer"
            onClick={() => { navigate(`/create/${id}`) } /*  TODO: add takes u to create view */}
          >
            <FaPencilAlt />
          </button>
        </div>
      }

    </div>
  )
}

export default CharacterViewer;
