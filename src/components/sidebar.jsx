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
  
  // Updated isActive for DaisyUI menu. It usually applies 'active' to the <a> or <Link> itself.
  // Or, if DaisyUI menu structure expects 'active' on <li>, this can be adjusted.
  // For now, applying to Link directly.
  const isActive = (path) => {
    // Handle exact match for /dashboard or /
    if (path === '/dashboard' || path === '/') {
      return location.pathname === path || (location.pathname === '/' && path === '/dashboard');
    }
    // Handle startsWith for other paths
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-base-100 shadow-lg transition-all duration-300 h-screen flex flex-col`}>
      <div className="p-4 flex items-center justify-center border-b border-base-300 h-16"> {/* Fixed height for header */}
        {sidebarOpen ? (
          <h2 className="text-primary font-bold text-xl">Rojas Market</h2>
        ) : (
          <FaShoppingCart className="text-primary h-6 w-6" /> // Icon when collapsed
        )}
      </div>
        
      {/* Apply menu classes to ul and manage width based on sidebarOpen */}
      <ul className={`menu p-2 space-y-2 flex-grow ${sidebarOpen ? 'w-full' : 'w-full items-center'}`}> {/* Adjusted padding for icons when collapsed */}
        <li className={isActive('/dashboard') || isActive('/') ? 'active' : ''}>
          <Link 
            to="/dashboard" 
            className={`flex items-center ${!sidebarOpen && 'justify-center'}`}
          >
            <FaHome className={`h-5 w-5 ${sidebarOpen && 'mr-2'}`} />
            {sidebarOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li className={isActive('/ventas') ? 'active' : ''}>
          <Link 
            to="/ventas" 
            className={`flex items-center ${!sidebarOpen && 'justify-center'}`}
          >
            <FaShoppingCart className={`h-5 w-5 ${sidebarOpen && 'mr-2'}`} />
            {sidebarOpen && <span>Ventas</span>}
          </Link>
        </li>
        <li className={isActive('/productos') ? 'active' : ''}>
          <Link 
            to="/productos" 
            className={`flex items-center ${!sidebarOpen && 'justify-center'}`}
          >
            <FaBoxOpen className={`h-5 w-5 ${sidebarOpen && 'mr-2'}`} />
            {sidebarOpen && <span>Productos</span>}
          </Link>
        </li>
        <li className={isActive('/categorias') ? 'active' : ''}>
          <Link 
            to="/categorias" 
            className={`flex items-center ${!sidebarOpen && 'justify-center'}`}
          >
            <FaTags className={`h-5 w-5 ${sidebarOpen && 'mr-2'}`} />
            {sidebarOpen && <span>Categorías</span>}
          </Link>
        </li>
        <li className={isActive('/clientes') ? 'active' : ''}>
          <Link 
            to="/clientes" 
            className={`flex items-center ${!sidebarOpen && 'justify-center'}`}
          >
            <FaUsers className={`h-5 w-5 ${sidebarOpen && 'mr-2'}`} />
            {sidebarOpen && <span>Clientes</span>}
          </Link>
        </li>
        <li className={isActive('/usuarios') ? 'active' : ''}>
          <Link 
            to="/usuarios" 
            className={`flex items-center ${!sidebarOpen && 'justify-center'}`}
          >
            <FaUserCog className={`h-5 w-5 ${sidebarOpen && 'mr-2'}`} />
            {sidebarOpen && <span>Usuarios</span>}
          </Link>
        </li>
        <li className={isActive('/reportes') ? 'active' : ''}>
          <Link 
            to="/reportes"  // Changed to Link
            className={`flex items-center ${!sidebarOpen && 'justify-center'}`}
          >
            <FaClipboardList className={`h-5 w-5 ${sidebarOpen && 'mr-2'}`} />
            {sidebarOpen && <span>Reportes</span>}
          </Link>
        </li>
        <li className={isActive('/configuracion') ? 'active' : ''}>
          <Link 
            to="/configuracion" // Changed to Link
            className={`flex items-center ${!sidebarOpen && 'justify-center'}`}
          >
            <FaCog className={`h-5 w-5 ${sidebarOpen && 'mr-2'}`} />
            {sidebarOpen && <span>Configuración</span>}
          </Link>
        </li>
      </ul>
        
      <div className="p-4 border-t border-base-300">
        <button className={`btn btn-outline btn-error btn-sm w-full ${!sidebarOpen && 'btn-square'}`}>
          <FaSignOutAlt className={`h-5 w-5 ${sidebarOpen && 'mr-2'}`} />
          {sidebarOpen && <span>Cerrar sesión</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
