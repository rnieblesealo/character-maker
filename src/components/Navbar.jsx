import clsx from "clsx"
import { useState } from "react"
import { Link, Outlet } from "react-router-dom" // NOTE: outlet = placeholder where child routes will go

const Navbar = () => {
  const NavbarLink = ({ text, to }) => {
    const [hovered, setIsHovered] = useState(false)

    function handleMouseEnter() {
      setIsHovered(true)
    }

    function handleMouseLeave() {
      setIsHovered(false)
    }

    const color = clsx(hovered ? "text-red-500" : "text-white")

    return (
      <li>

        <Link
          to={to}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex items-center justify-center px-4">
          {hovered &&
            <img
              src="/selector.png"
              className="w-4 mr-2"
            />
          }
          <p className={color}>{text}</p>
        </Link>

      </li>
    )
  }

  return (
    <div className="bg-black text-white font-pixel text-3xl flex flex-col items-center">
      <h1 className="text-5xl p-4">Character Maker</h1>

      <nav className="mb-10">
        <ul className="flex items-center justify-center">
          <NavbarLink to={"/"} text="VIEW" />
          <NavbarLink to={"/create"} text="CREATE" />
        </ul>
      </nav>
 
      <Outlet/>
    </div>
  )
}

export default Navbar
