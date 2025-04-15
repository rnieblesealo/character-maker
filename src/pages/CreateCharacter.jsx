import CharacterViewer from "../components/CharacterViewer"
import SkinTonePicker from "../components/SkinTonePicker"
import ClothingPicker from "../components/ClothingPicker"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

import supabase from "../scripts/client"

import allTops from "../data/tops.json"
import allPants from "../data/pants.json"
import allHairstyles from "../data/hairstyles.json"
import allSkinTones from "../data/skinTones.json"

import { useParams } from "react-router-dom"

const CreateCharacter = () => {
  const navigate = useNavigate()
  const params = useParams()

  const [skinTone, setSkinTone] = useState("")
  const [name, setName] = useState("My Character")
  const [hair, setHair] = useState("")
  const [top, setTop] = useState("")
  const [pants, setPants] = useState("")

  const nameInput = useRef(null)

  useEffect(() => {
    async function fetchCharacter() {
      // fetch character if entered view with an id (in edit mode)
      const characterId = params.id
      if (!characterId) {
        return
      }

      const character = await supabase
        .from("characters")
        .select() // NOTE: no arg selects all
        .eq("id", characterId)
        .single() // NOTE: expects only 1 row to be returned

      const characterData = character.data

      setSkinTone(characterData.skinTone)
      setName(characterData.name)
      setHair(characterData.hair)
      setTop(characterData.top)
      setPants(characterData.pants)

      nameInput.current.value = characterData.name
    }

    fetchCharacter()
  }, [params.id])

  function handleNameChange(e) {
    const nameInput = e.target.value
    if (nameInput) {
      setName(nameInput)
    } else {
      setName("My Character")
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

  async function handleUpdateCharacter(e) {
    e.preventDefault()

    const characterId = params.id
    if (!characterId) {
      return
    }

    await supabase
      .from("characters")
      .update({
        name: name,
        skinTone: skinTone,
        hair: hair,
        top: top,
        pants: pants,
      })
      .eq("id", characterId)

    // go to view screen
    navigate("/")
  }

  return (
    <div className="h-min w-screen bg-black text-white font-pixel text-3xl flex flex-col items-center">
      <h2 className="text-4xl text-center">Create or Update Character</h2>

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
            ref={(me) => nameInput.current = me}
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

        <div className="flex w-full gap-2 m-4">
          {!params.id &&
            <button
              onClick={handleCreateCharacter}
              className="w-full p-2 bg-lime-700 rounded-lg"
            >
              Create!
            </button>
          }
          <button
            onClick={handleUpdateCharacter}
            className="w-full p-2 bg-orange-700 rounded-lg"
          >
            Update
          </button>
        </div>

      </div>
    </div>
  )
}

export default CreateCharacter
