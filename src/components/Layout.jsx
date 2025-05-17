import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaShoppingCart, 
  FaBoxOpen, 
  FaUsers, 
  FaTags,
  FaHome,
  FaClipboardList,
  FaCog,
  FaBell,
  FaSignOutAlt,
  FaSearch,
  FaUserCog,
  FaSun,
  FaMoon
} from 'react-icons/fa';

const useTheme = () => {
  // Verificar el tema guardado o usar "autumn" como predeterminado
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'autumn'; // autumn = claro, dark = oscuro
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Efecto para aplicar el tema cuando cambia
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
};

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'autumn' ? 'dark' : 'autumn');
  };

  // Determinar qué ruta está activa para resaltarla en el sidebar
  const isActive = (path) => {
    return location.pathname === path || 
      (path !== '/dashboard' && location.pathname.startsWith(path)) ||
      (path === '/dashboard' && location.pathname === '/');
  };

  return (
    <div className="flex h-screen bg-base-200">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-base-100 shadow-lg transition-all duration-300 h-screen`}>
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-center border-b border-base-300">
            <h2 className={`text-primary font-bold text-xl ${!sidebarOpen && 'hidden'}`}>Rojas Market</h2>
            {!sidebarOpen && <FaShoppingCart className="text-primary" />}
          </div>
          
          <div className="p-4 flex-grow">
            <ul className="menu space-y-2">
              <li>
                <Link to="/dashboard" className={`flex items-center rounded-lg ${isActive('/dashboard') ? 'bg-primary/10 text-primary' : ''}`}>
                  <FaHome />
                  {sidebarOpen && <span>Dashboard</span>}
                </Link>
              </li>
              <li>
                <Link to="/ventas" className={`flex items-center rounded-lg ${isActive('/ventas') ? 'bg-primary/10 text-primary' : ''}`}>
                  <FaShoppingCart />
                  {sidebarOpen && <span>Ventas</span>}
                </Link>
              </li>
              <li>
                <Link to="/productos" className={`flex items-center rounded-lg ${isActive('/productos') ? 'bg-primary/10 text-primary' : ''}`}>
                  <FaBoxOpen />
                  {sidebarOpen && <span>Productos</span>}
                </Link>
              </li>
              <li>
                <Link to="/categorias" className={`flex items-center rounded-lg ${isActive('/categorias') ? 'bg-primary/10 text-primary' : ''}`}>
                  <FaTags />
                  {sidebarOpen && <span>Categorías</span>}
                </Link>
              </li>
              <li>
                <Link to="/clientes" className={`flex items-center rounded-lg ${isActive('/clientes') ? 'bg-primary/10 text-primary' : ''}`}>
                  <FaUsers />
                  {sidebarOpen && <span>Clientes</span>}
                </Link>
              </li>
              <li>
                <Link to="/usuarios" className={`flex items-center rounded-lg ${isActive('/usuarios') ? 'bg-primary/10 text-primary' : ''}`}>
                  <FaUserCog />
                  {sidebarOpen && <span>Usuarios</span>}
                </Link>
              </li>
              <li>
                <a className="flex items-center rounded-lg">
                  <FaClipboardList />
                  {sidebarOpen && <span>Reportes</span>}
                </a>
              </li>
              <li>
                <a className="flex items-center rounded-lg">
                  <FaCog />
                  {sidebarOpen && <span>Configuración</span>}
                </a>
              </li>
              
              {/* Botón para cambiar el tema */}
              <li className="mt-auto">
                <button 
                  className="flex items-center rounded-lg" 
                  onClick={toggleTheme}
                >
                  {theme === 'autumn' ? <FaMoon /> : <FaSun />}
                  {sidebarOpen && (
                    <span>{theme === 'autumn' ? 'Modo oscuro' : 'Modo claro'}</span>
                  )}
                </button>
              </li>
            </ul>
          </div>
          
          <div className="p-4 border-t border-base-300">
            <button className="btn btn-outline btn-error btn-sm w-full">
              <FaSignOutAlt />
              {sidebarOpen && <span className="ml-2">Cerrar sesión</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-base-100 p-4 shadow-md flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              className="btn btn-ghost btn-sm mr-2" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-semibold text-primary">
              {location.pathname === '/' || location.pathname === '/dashboard' ? 'Panel de Control' :
               location.pathname === '/categorias' ? 'Categorías' :
               location.pathname === '/productos' ? 'Productos' :
               location.pathname === '/ventas' ? 'Ventas' :
               location.pathname === '/clientes' ? 'Clientes' :
               location.pathname === '/usuarios' ? 'Usuarios' : 'Rojas Market'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input type="text" placeholder="Buscar..." className="input input-bordered input-sm max-w-xs" />
              <FaSearch className="absolute top-2.5 right-3 text-gray-400" />
            </div>
            
            <div className="indicator">
              <span className="indicator-item badge badge-secondary badge-sm">3</span>
              <button className="btn btn-ghost btn-circle">
                <FaBell />
              </button>
            </div>
            
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-8">
                <span>AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        <footer className="p-4 bg-base-100 text-center text-sm opacity-70 border-t border-base-300">
          © 2023 Rojas Market POS - Todos los derechos reservados
        </footer>
      </div>
    </div>
  );
};

export default Layout;
