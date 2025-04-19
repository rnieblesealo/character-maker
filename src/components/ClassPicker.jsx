const ClassPicker = ({ icon, classData, get, set }) => {
  // WARNING: THIS IS FUCKIGN AWFUIL FIX IT LATER ...

  // NOTE: this might not work
  const isSelectedClass = get && (get === classData)

  return (
    <button
      // fuckshit styling because we're dynamically passing color
      className="flex flex-col items-center justify-center m-4 p-3 pb-1 aspect-square rounded-lg cursor-pointer"
      onMouseEnter={(e) => {
        // if this is the selected class the border will always stay the same
        if (isSelectedClass) {
          return
        }

        e.currentTarget.style.outline = `1px solid ${classData.color}`
      }}
      onMouseLeave={(e) => {
        if (isSelectedClass) {
          return
        }

        e.currentTarget.style.outline = `1px solid transparent`
      }}
      onClick={() => { set(classData) }}
      // check what class is set to and outline if so
      // oh god...
      style={{
        outline: `${isSelectedClass ? "5" : "1"}px solid ${isSelectedClass ? classData.color : "transparent"}`
      }}
    >
      <span
        style={{
          color: classData.color
        }}
      >
        {icon}
      </span>
      <span
        style={{
          color: classData.color
        }}
      >{classData.fullName}</span>
    </button>
  )
}

export default ClassPicker
