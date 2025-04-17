import supabase from "../scripts/client"

import CharacterViewer from "../components/CharacterViewer"
import ClothingItem from "../components/ClothingItem"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import allHairstyles from "../data/hairstyles.json"
import allPants from "../data/pants.json"
import allTops from "../data/tops.json"

const DetailView = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [characterInfo, setCharacterInfo] = useState({})

  useEffect(() => {
    async function fetchCharacter() {
      const characterId = params.id
      const character = await supabase
        .from("characters")
        .select() // NOTE: no arg selects all
        .eq("id", characterId)
        .single() // NOTE: expects only 1 row to be returned

      setCharacterInfo(character.data)
    }

    fetchCharacter()
  }, [params.id])

  return (
    <div className="h-min w-screen bg-black text-white font-pixel text-3xl flex flex-col items-center justify-start">
      <h2 className="text-4xl text-center mb-4">View Character</h2>

      <div className="flex flex-col">
        <div className="flex flex-row">

          <div className="m-2">
            <div className="text-3xl text-center m-3">Preview</div>
            {characterInfo &&
              <CharacterViewer
                name={characterInfo.name}
                skinTone={characterInfo.skinTone}
                hair={characterInfo.hair}
                top={characterInfo.top}
                pants={characterInfo.pants}
                hero
              />
            }
          </div>

          <div className="flex flex-col m-2">
            <h3 className="text-3xl text-center m-3">Clothing</h3>
            <div className="flex flex-col gap-1">
              <ClothingItem clothes={allHairstyles} name={characterInfo.hair} missingText="No hair" />
              <ClothingItem clothes={allTops} name={characterInfo.top} missingText="No top" />
              <ClothingItem clothes={allPants} name={characterInfo.pants} missingText="No pants" />
            </div>
          </div>

        </div>

        <button
          onClick={() => navigate("/")}
          className="text-white hover:text-red-500 border-1 hover:border-red-500 rounded-lg flex items-center justify-center">
          Back
        </button>

      </div>
    </div>
  )
}

export default DetailView
