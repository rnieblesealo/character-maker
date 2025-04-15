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

    // a placeholder empty div is rendered when the selector icon is gone to avoid having the text move around when the size changes due to it 
    // a fixed width is used to create space for it
    // this means that text large enough may break things
    // this also means the text won't be centered by flex because each nav entry will have the placeholder beside it, creating a margin
    // because of this all the nav entries were shifted left by an eyeballed amt. to make things look ok
    return (
      <li>

        <Link
          to={to}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex items-center justify-center px-4 transition-text duration-[100ms] w-30">
          {hovered ?
            <img
              src="/selector.png"
              className="w-4 mr-2 animate-fade-up animate-once animate-duration-200"
            />
            : <div className="w-4 mr-2" />
          }
          <p
            className={color}
            style={{
              transition: "color 150ms ease-in-out", // eyeballed ms to match anim timing roughly
              color: hovered && "#EF4444"
            }}
          >
            {text}
          </p>
        </Link>

      </li>
    )
  }

  return (
    <div className="bg-black text-white font-pixel text-3xl flex flex-col items-center">
      <h1 className="text-5xl p-4">Character Maker</h1>

      <nav className="mb-10 ml-[-40px]"> {/* eyeballed margin to shift navbar by the placeholder space of the selector icon's width */}
        <ul className="flex items-center justify-center">
          <NavbarLink to={"/"} text="VIEW" />
          <NavbarLink to={"/create"} text="CREATE" />
        </ul>
      </nav>

      <Outlet />
    </div>
  )
}

export default Navbar
