import CharacterViewer from "../components/CharacterViewer"
import SkinTonePicker from "../components/SkinTonePicker"
import ClothingPicker from "../components/ClothingPicker"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import supabase from "../scripts/client"

import allTops from "../data/tops.json"
import allPants from "../data/pants.json"
import allHairstyles from "../data/hairstyles.json"
import allSkinTones from "../data/skinTones.json"

const CreateCharacter = () => {
  const navigate = useNavigate()

  const [skinTone, setSkinTone] = useState("")
  const [name, setName] = useState("My Character")
  const [hair, setHair] = useState("")
  const [top, setTop] = useState("")
  const [pants, setPants] = useState("")

  function handleNameChange(e) {
    const nameInput = e.target.value
    if (nameInput) {
      setName(nameInput)
    }
  }

  async function handleCreateCharacter(e) {
    e.preventDefault()

    await supabase
      .from("characters")
      .insert({
        name: name,
        skinTone: skinTone,
        hair: hair,
        top: top,
        pants: pants,
      })
      .select()

    // go to view screen
    navigate("/")
  }

  return (
    <div className="h-min w-screen bg-black text-white font-pixel text-3xl flex flex-col items-center">
      <h2 className="text-4xl text-center">Create New Character</h2>

      <div className="p-4">
        <CharacterViewer
          name={name}
          skinTone={skinTone}
          hair={hair}
          top={top}
          pants={pants}
          hero
        />
      </div>

      <div className="flex flex-col items-start justify-center">

        <div className="flex items-center mx-4 mb-4">
          <label htmlFor="name" className="w-30">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="My Character"
            onChange={handleNameChange}
            className="bg-gray-800 p-1 pl-3 focus:outline-0 placeholder:text-gray-600 rounded-lg w-[188px]" />
        </div>

        <SkinTonePicker
          skinTones={allSkinTones}
          set={setSkinTone}
        />
        <ClothingPicker
          clothes={allHairstyles}
          name="Hairstyles"
          set={setHair}
        />
        <ClothingPicker
          clothes={allTops}
          name="Tops"
          set={setTop}
        />
        <ClothingPicker
          clothes={allPants}
          name="Pants"
          set={setPants}
        />

        <div className="flex w-1/2 gap-2 m-4">
          <button className="w-full p-2 bg-lime-700 rounded-lg" onClick={handleCreateCharacter}>
            Create!
          </button>
          <button className="w-full p-2 bg-orange-700 rounded-lg">
            Update
          </button>
        </div>

      </div>
    </div>
  )
}

export default CreateCharacter
