import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import ViewCharacters from "./pages/ViewCharacters"
import CreateCharacter from "./pages/CreateCharacter"

/* routing example:  
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<Dashboard />} />
          <Route index={false} path="/artistInfo/:id" element={<DetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
*/

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index={true} element={<ViewCharacters />} />
          <Route path="/create" element={<CreateCharacter />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
