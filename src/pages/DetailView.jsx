import supabase from "../scripts/client"

import CharacterViewer from "../components/CharacterViewer"
import ClothingItem from "../components/ClothingItem"
import StatItem from "../components/StatItem"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import allHairstyles from "../data/hairstyles.json"
import allPants from "../data/pants.json"
import allTops from "../data/tops.json"

import { FaHeart } from "react-icons/fa";
import { PiSwordFill } from "react-icons/pi";
import { FaShieldAlt } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";

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

        <div className="w-full rounded-lg mt-4 mb-8 p-4 flex items-center justify-center gap-4">
          <StatItem icon={<FaHeart />} fullName="Health" abbrev="HP" value={characterInfo.hp} />
          <StatItem icon={<FaShieldAlt />} fullName="Defense" abbrev="DEF" value={characterInfo.defense} />
          <StatItem icon={<PiSwordFill />} fullName="Attack" abbrev=" ATK" value={characterInfo.attack} />
          <StatItem icon={<FaBoltLightning />} fullName="Stamina" abbrev="STA" value={characterInfo.stamina} />
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
