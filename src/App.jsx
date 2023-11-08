import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import SingleWeather from "./pages/SingleWeather"
import SavedLocations from "./pages/SavedLocations"

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/weather" element={<SingleWeather/>} />
      <Route path="/savedlocations" element={<SavedLocations/>} />
    </Routes>
  )
}

export default App