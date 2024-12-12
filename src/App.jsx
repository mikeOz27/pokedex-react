import { BrowserRouter as BR, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Index from './views/Index'
import Detail from './views/Detail'
import Pokemon from './components/Pokemon'

function App() {

  return (
    <>
      <BR>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/pokemon/:name' element={<Detail />} />
          <Route path='/pokemons/' element={<Pokemon />} />
        </Routes>
      </BR>
    </>
  )
}

export default App
