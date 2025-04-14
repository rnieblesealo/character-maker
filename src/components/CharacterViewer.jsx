const CharacterViewer = ({
  name,
  hair,
  head,
  top,
  pants,
  body
}) => {
  return (
    <div>
      <div className="relative bg-gray-400 w-50 aspect-square rounded-lg">
        {hair &&
          <img
            src={hair}
            className="absolute z-5"
          />
        }
        {head &&
          <img
            src={head}
            className="absolute z-4"
          />
        }
        {top &&
          <img
            src={top}
            className="absolute z-3"
          />
        }
        {pants &&
          <img
            src={pants}
            className="absolute z-2"
          />
        }
        {body &&
          <img
            src={body}
            className="absolute z-1"
          />
        }
      </div>
      {name &&
        <p className="text-center mt-2">{name}</p>
      }
    </div>
  )
}

export default CharacterViewer;
