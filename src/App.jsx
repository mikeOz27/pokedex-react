import { BrowserRouter as BR, Routes, Route } from 'react-router-dom'
// import Index from './views/Index'
import Detail from './views/Detail'
import Pokemon from './components/Pokemon'
import './App.css'
// style.scss
import "nes.css/css/nes.css"
// script.js
import "nes.css/css/nes.min.css";

function App() {

  return (
    <BR basename="/pokedex-react/">
      <Routes>
        <Route path="/" element={<Pokemon />} />
        <Route path="/pokemon/:id" element={<Detail />} />
      </Routes>
    </BR>
  );
}

export default App
