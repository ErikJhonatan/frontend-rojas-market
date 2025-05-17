import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaShoppingCart, 
  FaBoxOpen, 
  FaUsers, 
  FaTags,
  FaHome,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaUserCog
} from 'react-icons/fa';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path || 
      (path !== '/dashboard' && location.pathname.startsWith(path));
  };

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-base-100 shadow-lg transition-all duration-300 h-screen`}>
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-center border-b border-base-300">
          <h2 className={`text-primary font-bold text-xl ${!sidebarOpen && 'hidden'}`}>Rojas Market</h2>
          {!sidebarOpen && <FaShoppingCart className="text-primary" />}
        </div>
        
        <div className="p-4 flex-grow">
          <ul className="menu space-y-2">
            <li>
              <Link 
                to="/dashboard" 
                className={`flex items-center rounded-lg ${isActive('/dashboard') || isActive('/') ? 'bg-primary/10 text-primary' : ''}`}
              >
                <FaHome />
                {sidebarOpen && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/ventas" 
                className={`flex items-center rounded-lg ${isActive('/ventas') ? 'bg-primary/10 text-primary' : ''}`}
              >
                <FaShoppingCart />
                {sidebarOpen && <span>Ventas</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/productos" 
                className={`flex items-center rounded-lg ${isActive('/productos') ? 'bg-primary/10 text-primary' : ''}`}
              >
                <FaBoxOpen />
                {sidebarOpen && <span>Productos</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/categorias" 
                className={`flex items-center rounded-lg ${isActive('/categorias') ? 'bg-primary/10 text-primary' : ''}`}
              >
                <FaTags />
                {sidebarOpen && <span>Categorías</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/clientes" 
                className={`flex items-center rounded-lg ${isActive('/clientes') ? 'bg-primary/10 text-primary' : ''}`}
              >
                <FaUsers />
                {sidebarOpen && <span>Clientes</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/usuarios" 
                className={`flex items-center rounded-lg ${isActive('/usuarios') ? 'bg-primary/10 text-primary' : ''}`}
              >
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
  );
};

export default Sidebar;
