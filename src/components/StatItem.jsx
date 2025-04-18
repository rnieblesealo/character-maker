import MouseTooltip from "./MouseTooltip"
import { FaXmark } from "react-icons/fa6"

const StatItem = ({ icon, fullName, abbrev, value, color }) => {
  return (
    <div className="flex items-center">
      <span className="flex items-center relative text-2xl">
        <MouseTooltip text={fullName ?? (abbrev ?? "???")} />
        <span style={{ color: color ?? "white" }}>
          {icon ?? <FaXmark />}
        </span>
        <span className="mx-2" style={{ color: color ?? "white" }}>
          {value ?? "?"} {fullName ?? "???"}
        </span>
      </span>
    </div>
  )
}

export default StatItem
