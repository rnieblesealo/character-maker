import CharacterViewer from "./components/CharacterViewer"
import SkinTonePicker from "./components/SkinTonePicker"
import ClothingPicker from "./components/ClothingPicker"

import { useState } from "react"

import allTops from "./data/tops.json"
import allPants from "./data/pants.json"
import allHairstyles from "./data/hairstyles.json"

function App() {
  const [name, setName] = useState("My Character")
  const [hair, setHair] = useState("")
  const [head, setHead] = useState("")
  const [top, setTop] = useState("")
  const [pants, setPants] = useState("")
  const [body, setBody] = useState("")

  function handleNameSubmit(e) {
    e.preventDefault() // prevent page reload

    const nameInput = e.target.elements.name.value

    if (nameInput) {
      setName(nameInput) // access form element values by name attribute
    }
  }

  return (
    <div className="w-screen h-min bg-black text-white font-pixel text-3xl flex flex-col items-center justify-start">
      <h1 className="text-5xl text-center m-4">Character Creator</h1>
      <CharacterViewer
        name={name}
        hair={hair}
        head={head}
        top={top}
        pants={pants}
        body={body}
        hero
      />
      <div className="flex flex-col items-start justify-center m-4" onSubmit={handleNameSubmit}>

        <form onSubmit={handleNameSubmit}>
          <div className="flex items-center m-4">
            <label htmlFor="name" className="w-30">Name</label>
            <input type="text" id="name" name="name" placeholder="My Character" className="bg-gray-800 p-1 pl-3 focus:outline-0 placeholder:text-gray-600 rounded-lg w-[188px]" />
          </div>
        </form>

        <SkinTonePicker
          setBody={setBody}
          setHead={setHead}
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
          <button className="w-full p-2 bg-lime-700 rounded-lg">
            Create!
          </button>
          <button className="w-full p-2 bg-orange-700 rounded-lg">
            Update
          </button>
        </div>

      </div>
      <h2 className="text-4xl">My Characters</h2>
      <div className="grid grid-cols-2 p-4 gap-3">

        <CharacterViewer
          name={name}
          hair={hair}
          head={head}
          top={top}
          pants={pants}
          body={body}
        />
        <CharacterViewer
          name={name}
          hair={hair}
          head={head}
          top={top}
          pants={pants}
          body={body}
        />

      </div>
    </div>
  )
}

export default App
