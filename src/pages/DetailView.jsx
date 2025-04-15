import supabase from "../scripts/client"

import CharacterViewer from "../components/CharacterViewer"
import ClothingItem from "../components/ClothingItem"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import allHairstyles from "../data/hairstyles.json"
import allPants from "../data/pants.json"
import allTops from "../data/tops.json"

const DetailView = () => {
  const params = useParams()

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
      <h2 className="text-4xl text-center">View Character</h2>

      <div className="flex">

        <div className="m-4">
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

        <div className="flex flex-col gap-1 m-4">
          <ClothingItem clothes={allHairstyles} name={characterInfo.hair} missingText="No hair" />
          <ClothingItem clothes={allTops} name={characterInfo.top} missingText="No top" />
          <ClothingItem clothes={allPants} name={characterInfo.pants} missingText="No pants" />
        </div>

      </div>
    </div>
  )
}

export default DetailView
