import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Landing } from './screen/Landing'
import { Game } from './screen/Game'

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing></Landing>}></Route>
      <Route path='/game' element={<Game></Game>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
