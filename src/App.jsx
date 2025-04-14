import CharacterViewer from "./components/CharacterViewer"
import SkinTonePicker from "./components/SkinTonePicker"
import ClothingPicker from "./components/ClothingPicker"

import { useState } from "react"

import allTops from "./data/tops.json"
import allPants from "./data/pants.json"
import allHairstyles from "./data/hairstyles.json"

function App() {
  const [hair, setHair] = useState("")
  const [head, setHead] = useState("")
  const [top, setTop] = useState("")
  const [pants, setPants] = useState("")
  const [body, setBody] = useState("")

  return (
    <div className="w-screen h-screen bg-black text-white font-pixel text-3xl flex flex-col items-center justify-start">
      <p className="text-5xl text-center m-4">Character Creator</p>
      <CharacterViewer
        hair={hair}
        head={head}
        top={top}
        pants={pants}
        body={body}
      />
      <div className="flex flex-col items-start justify-center m-4">
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
      </div>
    </div>
  )
}

export default App
