import CharacterViewer from "../components/CharacterViewer"
import { useState, useEffect } from "react"
import supabase from "../scripts/client"

const ViewCharacters = () => {
  const [dbCharacters, setDbCharacters] = useState([])

  useEffect(() => {
    async function fetchCharacters() {
      const characters = await supabase
        .from("characters")
        .select()
        .order("created_at", { ascending: true })

      setDbCharacters(characters?.data)
    }

    fetchCharacters()
    
    console.log("this")
  }, [])

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
    <div className="h-min w-screen bg-black text-white font-pixel text-3xl flex flex-col items-center justify-start">
      <h2 className="text-4xl text-center">View Characters</h2>
      <div className="grid grid-cols-2 p-4 gap-3 w-100">
        {dbCharacterViewers}
      </div>
    </div>
  )
}

export default ViewCharacters
