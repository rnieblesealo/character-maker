import CharacterViewer from "./components/CharacterViewer"
import SkinTonePicker from "./components/SkinTonePicker"
import ClothingPicker from "./components/ClothingPicker"

import { useState, useEffect } from "react"

import supabase from "./scripts/client"

import allTops from "./data/tops.json"
import allPants from "./data/pants.json"
import allHairstyles from "./data/hairstyles.json"
import allSkinTones from "./data/skinTones.json"

function App() {
  const [dbCharacters, setDbCharacters] = useState([])
  const [latestCreateTime, setLatestCreateTime] = useState(0)
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

    // NOTE: not really useful semantically, but helps us leverage useEffect to refetch db
    setLatestCreateTime(Date.now().toLocaleString())
  }

  useEffect(() => {
    async function fetchCharacters() {
      const characters = await supabase
        .from("characters")
        .select()
        .order("created_at", { ascending: true })

      setDbCharacters(characters?.data)
    }

    fetchCharacters()
  }, [latestCreateTime])

  const dbCharacterViewers = dbCharacters?.map((info) => (
    <CharacterViewer
      key={info.name}
      name={info.name}
      skinTone={info.skinTone}
      hair={info.hair}
      top={info.top}
      pants={info.pants}
    />
  ))

  return (
    <div className="w-screen h-min bg-black text-white font-pixel text-3xl flex flex-col items-center justify-start">
      <h1 className="text-5xl text-center m-4">Character Creator</h1>
      <CharacterViewer
        name={name}
        skinTone={skinTone}
        hair={hair}
        top={top}
        pants={pants}
        hero
      />
      <div className="flex flex-col items-start justify-center m-4">

        <div className="flex items-center m-4">
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
          clothes={allTops}
          name="Tops"
          set={setTop}
        />
        <ClothingPicker
          clothes={allPants}
          name="Pants"
          set={setPants}
        />
        <ClothingPicker
          clothes={allHairstyles}
          name="Hairstyles"
          set={setHair}
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
      <h2 className="text-4xl">My Characters</h2>
      <div className="grid grid-cols-2 p-4 gap-3">
        {dbCharacterViewers}
      </div>
    </div>
  )
}

export default App
