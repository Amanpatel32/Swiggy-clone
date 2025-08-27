import Head from "./components/head"
import Body from "./components/body"
import { Route, Routes } from "react-router-dom"
import ResturantMenu from "./components/ResturantMenu"

function App() {


  return (
    <>

      <Routes>

        <Route path="/" element={<Head />}>
          <Route path="/" element={<Body />} />
          <Route path="/ResturantMenu/:id" element={<ResturantMenu />}></Route>
        </Route>



      </Routes>
    </>

  )
}

export default App
