const ClothingPart = ({ from, keyName, z }) => {
  if (keyName in from && from[keyName].asset) {
    return (
      <img
        src={from[keyName].asset}
        className="absolute"
        style={{
          zIndex: z
        }}
      />
    )
  } else {
    return null
  }
}

export default ClothingPart
