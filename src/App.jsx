import CharacterViewer from "./components/CharacterViewer"
import SkinTonePicker from "./components/SkinTonePicker"
import ClothingPicker from "./components/ClothingPicker"

import { useState } from "react"

function App() {
  const [hair, setHair] = useState("")
  const [head, setHead] = useState("")
  const [top, setTop] = useState("")
  const [pants, setPants] = useState("")
  const [body, setBody] = useState("")

  const allTops = {
    "Black Shirt": {
      icon: "/bodyparts_menu/m_sblack.png",
      asset: "/bodyparts/s_black.png"
    },
    "Dress": {
      icon: "/bodyparts_menu/m_sdress.png",
      asset: "/bodyparts/s_dress.png"
    },
    "Graphic Tee": {
      icon: "/bodyparts_menu/m_sgraphic.png",
      asset: "/bodyparts/s_graphic.png"
    },
    "Striped Shirt": {
      icon: "/bodyparts_menu/m_sstripes.png",
      asset: "/bodyparts/s_stripe.png"
    },
  }

  const allPants = {
    "Regular Jeans": {
      icon: "/bodyparts_menu/m_jeans.png",
      asset: "/bodyparts/b_jeans.png"
    },
    "Vintage Jeans": {
      icon: "/bodyparts_menu/m_jwashed.png",
      asset: "/bodyparts/b_washed.png"
    },
    "Jorts": {
      icon: "/bodyparts_menu/m_jorts.png",
      asset: "/bodyparts/b_jorts.png"
    },
  }

  const allHairstyles = {
    "Short": {
      icon: "/bodyparts_menu/m_shair.png",
      asset: "/bodyparts/s_hair.png"
    },
    "Emo": {
      icon: "/bodyparts_menu/m_lhair.png",
      asset: "/bodyparts/e_hair.png"
    },
    "Long": {
      icon: "/bodyparts_menu/m_mhair.png",
      asset: "/bodyparts/m_hair.png"
    },
  }

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
