import { FaXmark } from "react-icons/fa6";

const StatPicker = ({ icon, abbrev, set }) => {
  function handleStatChange(e) {
    // parse out a number
    const numberInput = parseInt(e.target.value)

    // clear input if not number
    if (!numberInput) {
      e.target.value = ""
      return;
    } else {
      // if typed chars around a number restrict to parsed number only
      e.target.value = numberInput.toString()

      // if exceed bounds clear input
      if (numberInput < 0 || numberInput > 99) {
        e.target.value = ""
        // if all ok, call setter if it's available 
      } else {
        if (set) {
          set(numberInput)
        } else {
          console.error("No setter defined: ", abbrev)
        }
      }
    }
  }

  return (
    <div className="flex items-center">
      <span>{icon ?? <FaXmark />}</span>
      <label htmlFor={abbrev} className="mx-2">{abbrev ?? "???"}</label>
      <input
        type="text"
        id={abbrev ?? "???"}
        name={abbrev ?? "???"}
        placeholder="0"
        onChange={handleStatChange}
        className="text-center bg-gray-800 p-1 aspect-square h-10 focus:outline-0 placeholder:text-gray-600 rounded-lg" />
    </div>
  )
}

export default StatPicker
