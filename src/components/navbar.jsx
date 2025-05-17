import { FiMenu } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { FaUserCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <FiMenu className="h-5 w-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/dashboard" className="flex items-center gap-2">
                <MdDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/categorias" className="flex items-center gap-2">
                <BiCategoryAlt className="h-4 w-4" />
                Categorías
              </Link>
            </li>
            <li>
              <Link to="/productos" className="flex items-center gap-2">
                <MdOutlineProductionQuantityLimits className="h-4 w-4" />
                Productos
              </Link>
            </li>
            <li>
              <Link to="/ventas" className="flex items-center gap-2">
                <TbReportMoney className="h-4 w-4" />
                Ventas
              </Link>
            </li>
            <li>
              <Link to="/clientes" className="flex items-center gap-2">
                <FiUsers className="h-4 w-4" />
                Clientes
              </Link>
            </li>
            <li>
              <Link to="/usuarios" className="flex items-center gap-2">
                <FaUserCog className="h-4 w-4" />
                Usuarios
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="text-3xl font-bold text-red-500 normal">
          Tienda Rojas Market
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <AiOutlineShoppingCart className="h-5 w-5" />
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Artículos</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">Ver carrito</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Componente Navbar de Tailwind CSS"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Perfil
                <span className="badge">Nuevo</span>
              </a>
            </li>
            <li>
              <a>Configuración</a>
            </li>
            <li>
              <a>Cerrar sesión</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
