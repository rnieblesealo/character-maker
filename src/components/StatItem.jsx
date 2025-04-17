import MouseTooltip from "./MouseTooltip"
import { FaXmark } from "react-icons/fa6"

const StatItem = ({ icon, fullName, abbrev, value }) => {
  return (
    <div className="flex items-center">
      <span className="flex items-center relative text-2xl">
        <MouseTooltip text={fullName ?? (abbrev ?? "???")} />
        {icon ?? <FaXmark />}
        <span className="mx-2">{value ?? "?"} {fullName ?? "???"}</span>
      </span>
    </div>
  )
}

export default StatItem
