import Head from "./components/head"
import Body from "./components/body"
import { Route, Routes } from "react-router-dom"
import { useState } from "react"
import ResturantMenu from "./components/ResturantMenu"
import { visibility as Visibility } from "./context/contextApi"
import { coordinates as Coordinates } from "./context/contextApi"

function App() {
  const [visible, setVisible] =useState(false);
  const[cord, setCord] = useState({
    lat: 28.7040592,
    lng: 77.10249019999999
  })


  return (
    <Coordinates.Provider value={{cord, setCord}}>
    <Visibility.Provider value={{ visible, setVisible }}>
      <div className={visible ? "overflow-hidden max-h-screen": " "}>
      <Routes>

        <Route path="/" element={<Head />}>
          <Route path="/" element={<Body />} />
          <Route path="/ResturantMenu/:id" element={<ResturantMenu />}></Route>
        </Route>



      </Routes>
      </div>
    </Visibility.Provider>
      </Coordinates.Provider>

  )
}

export default App
