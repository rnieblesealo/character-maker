import CharacterViewer from "../components/CharacterViewer"
import { useState, useEffect } from "react"
import supabase from "../scripts/client"
import Loader from "../components/Loader"

import charClasses from "../data/charClasses.json"

const ViewCharacters = () => {
  const [dbCharacters, setDbCharacters] = useState([])

  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now()) // not semantically useful; used for reloading purposes
  const [didFetchCharacters, setDidFetchCharacters] = useState(false)

  useEffect(() => {
    async function fetchCharacters() {
      const characters = await supabase
        .from("characters")
        .select()
        .order("created_at", { ascending: true })

      setDbCharacters(characters?.data)

      setDidFetchCharacters(true)
    }

    fetchCharacters()
  }, [lastUpdateTime])

  const dbCharacterViewers = dbCharacters?.map((info) => (
    <CharacterViewer
      key={info.name}
      id={info.id}
      name={info.name}
      skinTone={info.skinTone}
      hair={info.hair}
      top={info.top}
      pants={info.pants}

      hp={info.hp}
      def={info.def}
      sta={info.sta}

      str={info.str}
      arc={info.arc}
      int={info.int}

      charClass={charClasses[info.class]}

      setLastUpdateTime={setLastUpdateTime}
    />
  ))

  const content = (
    <div>
      <h2 className="text-4xl text-center">View All Characters</h2>
      <div className="flex flex-wrap p-4 gap-3 w-100">
        {dbCharacterViewers}
      </div>
    </div>
  )

  return (
    <div className="h-min w-screen bg-black text-white font-pixel text-3xl flex flex-col items-center justify-start">
      {didFetchCharacters
        ? content
        : <Loader text="Fetching..." />
      }
    </div>
  )
}

export default ViewCharacters
