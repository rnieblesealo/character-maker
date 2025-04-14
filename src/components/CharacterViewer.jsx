import clsx from "clsx"

const CharacterViewer = ({
  name,
  hair,
  head,
  top,
  pants,
  body,
  hero
}) => {
  const width = clsx(!hero ? "w-30" : "w-50")
  const textSize = clsx(!hero ? "text-2xl" : "text-4xl")
  const extra = clsx(!hero && "border-1 p-2 rounded-lg")

  return (
    <div className={`${extra} flex flex-col items-center justify-center`}>
      <div className={`${width} relative bg-gray-400 aspect-square rounded-lg`}>
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
        <p className={`${textSize} text-center mt-2`}>{name}</p>
      }
    </div>
  )
}

export default CharacterViewer;
