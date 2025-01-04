import { BrowserRouter as BR, Routes, Route } from 'react-router-dom'
import Index from './views/Index'
import Detail from './views/Detail'
import Pokemon from './components/Pokemon'
import './App.css'
// style.scss
import "nes.css/css/nes.css"
// script.js
import "nes.css/css/nes.min.css";

function App() {

  return (
    <>
      <BR>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/pokemon/:id' element={<Detail />} />
          <Route path='/pokemons/' element={<Pokemon />} />
        </Routes>
      </BR>
    </>
  )
}

export default App