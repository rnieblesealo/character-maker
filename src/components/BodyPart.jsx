const BodyPart = ({ from, colorKey, partKey, z }) => {
  if (colorKey in from && partKey in from[colorKey]) {
    return (
      <img
        src={from[colorKey][partKey]}
        className="absolute"
        style={{
          zIndex: z
        }}
      />
    )
  } else {
    return null;
  }
}

export default BodyPart
