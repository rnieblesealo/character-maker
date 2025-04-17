import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import ViewCharacters from "./pages/ViewCharacters"
import CreateCharacter from "./pages/CreateCharacter"
import DetailView from "./pages/DetailView"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index={true} element={<ViewCharacters />} />
          <Route path="/create/:id?" element={<CreateCharacter />} />
          <Route path="/view/:id" element={<DetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
