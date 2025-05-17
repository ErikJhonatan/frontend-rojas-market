import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/dashboard'
import Categorias from './pages/categorias'
import Productos from './pages/productos'
import Ventas from './pages/ventas'
import Clientes from './pages/clientes'
import Usuarios from './pages/usuarios'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
