import CharacterViewer from "../components/CharacterViewer"
import { useState, useEffect } from "react"
import supabase from "../scripts/client"
import Loader from "../components/Loader"

import charClasses from "../data/charClasses.json"

const ViewCharacters = () => {
  const [dbCharacters, setDbCharacters] = useState([])

  const [presidingClass, setPresidingClass] = useState({})
  const [classCounts, setClassCounts] = useState({})

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

      if (!characters?.data) {
        return
      }

      // find presiding class
      setPresidingClass(() => {
        // make frequency hashmap 
        const classFrequencies = {}
        for (const character of characters.data) {
          classFrequencies[character.class] = (classFrequencies[character.class] || 0) + 1
        }

        // set frequencies now that we have them
        setClassCounts(classFrequencies)

        // find greatest one 
        let maxFreq = 0
        let mostOcurring = null
        for (const [charClass, freq] of Object.entries(classFrequencies)) {
          if (freq > maxFreq) {
            maxFreq = freq
            mostOcurring = charClass
          }
        }

        return charClasses[mostOcurring];
      })
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

      {/* check if presiding class is ok */ presidingClass && Object.keys(presidingClass).length > 0 ?
        <span className="flex flex-col items-center justify-center w-full text-2xl">

          <span className="flex gap-8 my-2">
            <span>{classCounts.brawler ?? 0}<span className="ml-2" style={{ color: charClasses.brawler.color }}>brawler(s)</span></span>
            <span>{classCounts.psychic ?? 0}<span className="ml-2" style={{ color: charClasses.psychic.color }}>psychic(s)</span></span>
            <span>{classCounts.ranger ?? 0}<span className="ml-2" style={{ color: charClasses.ranger.color }}>ranger(s)</span></span>
          </span>

          <span className="mb-4">The<span className="mx-2" style={{ color: presidingClass.color }}> {presidingClass.fullName.toLowerCase().trim()}s</span>are running the show!</span>

        </span> :
        <span className="flex justify-center text-gray-600">No characters yet!</span>
      }

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
