import CharacterViewer from "../components/CharacterViewer"
import SkinTonePicker from "../components/SkinTonePicker"
import ClothingPicker from "../components/ClothingPicker"
import StatPicker from "../components/StatPicker"
import ClassPicker from "../components/ClassPicker"
import Loader from "../components/Loader"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

import supabase from "../scripts/client"

import allTops from "../data/tops.json"
import allPants from "../data/pants.json"
import allHairstyles from "../data/hairstyles.json"
import allSkinTones from "../data/skinTones.json"

import { useParams } from "react-router-dom"

import { FaHeart } from "react-icons/fa";
import { PiSwordFill } from "react-icons/pi";
import { FaShieldAlt } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { GiMuscleUp } from "react-icons/gi";
import { GiCrystalBall } from "react-icons/gi";
import { GiCrossbow } from "react-icons/gi";
import { GiMagicPalm } from "react-icons/gi";
import { GiBlackBook } from "react-icons/gi";

import charClasses from "../data/charClasses.json"

const CreateCharacter = () => {
  const navigate = useNavigate()
  const params = useParams()

  const [skinTone, setSkinTone] = useState("")
  const [name, setName] = useState("My Character")
  const [hair, setHair] = useState("")
  const [top, setTop] = useState("")
  const [pants, setPants] = useState("")

  // base stats
  const [hp, setHp] = useState(0)
  const [def, setDef] = useState(0)
  const [sta, setSta] = useState(0)

  const [charClass, setCharClass] = useState(charClasses.brawler)

  // special stats
  const [str, setStr] = useState(0) // brawler 
  const [arc, setArc] = useState(0) // psychic
  const [int, setInt] = useState(0) // ranger

  // state
  const [dupeExists, setDupeExists] = useState(false)
  const [didFetchCharacter, setDidFetchCharacter] = useState(false)
  const [didSetName, setDidSetName] = useState(false)
  const [committed, setCommitted] = useState(false)

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

      // base stats
      setHp(characterData.hp)
      setDef(characterData.def)
      setSta(characterData.sta)

      // special stat
      setStr(characterData.str)
      setArc(characterData.arc)
      setInt(characterData.int)

      setCharClass(charClasses[characterData.class])

      // say we fetched char
      setDidFetchCharacter(true)
    }

    fetchCharacter()
  }, [didFetchCharacter, params.id])

  useEffect(() => {
    if (!params.id) {
      setDidFetchCharacter(true)
    }

    if (didFetchCharacter && !didSetName && params.id) {
      nameInput.current.value = name
      setDidSetName(true)
    }
  }, [didFetchCharacter, didSetName, name, params.id])

  function handleNameChange(e) {
    const givenName = e.target.value

    if (givenName) {
      setName(givenName.trim())
    } else {
      setName("My Character")
    }

    // because we're changing name we can reset state of dupe error; user might've corrected it
    // it will appear again if needed regardless
    if (dupeExists) {
      setDupeExists(false)
    }
  }

  async function handleCreateCharacter(e) {
    e.preventDefault()

    // check if char w that name exists, disallow creation if so
    const dupes = await supabase
      .from("characters")
      .select()
      .eq("name", name.trim())

    if (dupes.data.length > 0) {
      setDupeExists(true)
      return
    }

    // if not do normal creation

    // show that we committed create
    setCommitted(true)

    await supabase
      .from("characters")
      .insert({
        name: name,
        skinTone: skinTone,
        hair: hair,
        top: top,
        pants: pants,

        hp: hp,
        def: def,
        sta: sta,

        str: str,
        arc: arc,
        int: int,

        class: Object.keys(charClasses).find((key) => charClasses[key] === charClass) // set class attr in db to the key of the currently set class
      })
      .select()

    // go to view screen
    navigate("/")
  }

  async function handleUpdateCharacter(e) {
    e.preventDefault()

    // check if char w new name exists, disallow creation if so
    const dupe = await supabase
      .from("characters")
      .select()
      .eq("name", name.trim())
      .single()

    // don't disallow own name since this would be the unique entry
    if (dupe && dupe.data.name !== name) {
      setDupeExists(true)
      return
    }

    // get id from params
    const characterId = params.id
    if (!characterId) {
      return
    }

    // show that we're doing the update
    setCommitted(true)

    // perform the update
    await supabase
      .from("characters")
      .update({
        name: name,
        skinTone: skinTone,
        hair: hair,
        top: top,
        pants: pants,

        hp: hp,
        def: def,
        sta: sta,

        str: str,
        arc: arc,
        int: int,

        class: Object.keys(charClasses).find((key) => charClasses[key] === charClass) // set class attr in db to the key of the currently set class
      })
      .eq("id", characterId)


    // go to view screen once done
    navigate("/")
  }

  const content = (
    <div>
      <h2 className="text-4xl text-center">
        {params.id ? <span>Update Character</span> : <span>Create Character</span>}
      </h2>

      <div className="p-4 flex flex-col items-center justify-center">

        <CharacterViewer
          name={name}
          skinTone={skinTone}
          hair={hair}
          top={top}
          pants={pants}
          hero
        />

        {dupeExists && <p className="text-red-500">A character with this name already exists; try another one!</p>}

        <div className="flex justify-center items-center items-stretch gap-3 h-min rounded-lg w-full">
          <ClassPicker icon={<GiMuscleUp />} classData={charClasses.brawler} get={charClass} set={setCharClass} />
          <ClassPicker icon={<GiCrystalBall />} classData={charClasses.psychic} get={charClass} set={setCharClass} />
          <ClassPicker icon={<GiCrossbow />} classData={charClasses.ranger} get={charClass} set={setCharClass} />
        </div>

        <div className="flex justify-center items-center gap-3 py-3 mb-6 h-min rounded-lg w-full">
          <StatPicker icon={<FaHeart />} fullName="Health" abbrev="HP" set={setHp} defaultVal={hp} />
          <StatPicker icon={<FaShieldAlt />} fullName="Defense" abbrev="DEF" set={setDef} defaultVal={def} />
          <StatPicker icon={<FaBoltLightning />} fullName="Stamina" abbrev="STA" set={setSta} defaultVal={sta} />

          {charClass === charClasses.brawler && <StatPicker icon={<PiSwordFill />} fullName="Strength" abbrev="STR" set={setStr} defaultVal={str} color={charClasses.brawler.color} />}
          {charClass === charClasses.psychic && <StatPicker icon={<GiMagicPalm />} fullName="Arcane" abbrev="ARC" set={setArc} defaultVal={arc} color={charClasses.psychic.color} />}
          {charClass === charClasses.ranger && <StatPicker icon={<GiBlackBook />} fullName="Intelligence" abbrev="INT" set={setInt} defaultVal={int} color={charClasses.ranger.color} />}
        </div>

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

          <button
            onClick={() => navigate("/")}
            className="w-full p-2 border-1 border-white hover:border-red-500 text-white hover:text-red-500 rounded-lg"
          >
            Cancel
          </button>

          {params.id &&
            <button
              onClick={handleUpdateCharacter}
              className="w-full p-2 bg-amber-800 hover:bg-amber-900 active:bg-amber-950 rounded-lg"
            >
              Update
            </button>
          }

          {!params.id &&
            <button
              onClick={handleCreateCharacter}
              className="w-full p-2 bg-lime-700 rounded-lg"
              style={{
                backgroundColor: dupeExists ? "oklch(55.1% 0.027 264.364)" : "oklch(52.7% 0.154 150.069)"
              }}
            >
              Create!
            </button>
          }

        </div>

      </div>
    </div>
  )

  return (
    <div className="h-min w-screen bg-black text-white font-pixel text-3xl flex flex-col items-center">
      {/* This reads like shit */}
      {didFetchCharacter
        ? (committed ? <Loader text={params.id ? "Updating..." : "Creating..."} /> : content)
        : <Loader text="Fetching..." />
      }
    </div >
  )
}

export default CreateCharacter
