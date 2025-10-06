import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CriacaoOferta from './pages/CriacaoOferta'
import ListaOfertas from './pages/ListaOfertas'
import Cabecalho from './components/Cabecalho'

function App() {
    return (
        <>
            <BrowserRouter>
                <Cabecalho />
                <Routes>
                    <Route path="/" element={<CriacaoOferta />} />
                    <Route path="/lista-ofertas" element={<ListaOfertas />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App