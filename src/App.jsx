import { BrowserRouter as BR, Routes, Route } from 'react-router-dom'
import Index from './views/Index'
import Detail from './views/Detail'
import Pokemon from './components/Pokemon'
import './App.css'

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
