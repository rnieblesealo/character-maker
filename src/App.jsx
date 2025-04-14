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

  function handleSubmit(e) {
    e.preventDefault() // prevent page reload

    const nameInput = e.target.elements.name.value

    if (nameInput) {
      setName(nameInput) // access form element values by name attribute
    }

    console.log("form submitting!") // FIXME: form submits everytime a button is clicked 
  }

  return (
    <div className="w-screen h-screen bg-black text-white font-pixel text-3xl flex flex-col items-center justify-start">
      <p className="text-5xl text-center m-4">Character Creator</p>
      <CharacterViewer
        name={name}
        hair={hair}
        head={head}
        top={top}
        pants={pants}
        body={body}
      />
      <form className="flex flex-col items-start justify-center m-4" onSubmit={handleSubmit}>

        <div className="flex items-center m-4">
          <label htmlFor="name" className="w-30">Name</label>
          <input type="text" id="name" name="name" placeholder="My Character" className="bg-gray-800 p-1 pl-3 focus:outline-0 placeholder:text-gray-600 rounded-lg w-[188px]" />
        </div>

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
      </form>
    </div>
  )
}

export default App
