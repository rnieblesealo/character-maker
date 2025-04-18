const SmallStatViewer = ({ icon, value, color, hideNumber }) => {
  return (
    <div className="w-min flex items-center justify-center" style={{ color: color ?? "white" }}>
      <span className="text-sm mr-1">
        {icon}
      </span>

      {!hideNumber &&
        <span className="text-xl mt-[0.5px]">
          {value}
        </span>
      }
    </div>
  )
}

export default SmallStatViewer
