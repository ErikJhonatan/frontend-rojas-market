import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaShoppingCart, 
  FaBoxOpen, 
  FaUsers, 
  FaTags,
  FaArrowUp,
  FaArrowDown,
  FaEllipsisV
} from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  
  // Datos simulados para los gráficos
  const salesData = [
    { name: 'Ene', ventas: 4000, clientes: 2400 },
    { name: 'Feb', ventas: 3000, clientes: 1398 },
    { name: 'Mar', ventas: 5000, clientes: 3800 },
    { name: 'Abr', ventas: 2780, clientes: 3908 },
    { name: 'May', ventas: 1890, clientes: 4800 },
    { name: 'Jun', ventas: 2390, clientes: 3800 },
  ];

  const categoryData = [
    { name: 'Abarrotes', value: 35 },
    { name: 'Bebidas', value: 25 },
    { name: 'Limpieza', value: 20 },
    { name: 'Snacks', value: 15 },
    { name: 'Otros', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const recentTransactions = [
    { id: 1, customer: 'Juan Pérez', items: 3, total: 125.50, date: '2023-05-15 15:30', status: 'completado' },
    { id: 2, customer: 'María López', items: 2, total: 87.20, date: '2023-05-15 14:15', status: 'completado' },
    { id: 3, customer: 'Carlos Ruiz', items: 5, total: 210.75, date: '2023-05-15 13:45', status: 'pendiente' },
    { id: 4, customer: 'Ana Gómez', items: 1, total: 45.30, date: '2023-05-15 12:20', status: 'completado' }
  ];

  const popularProducts = [
    { id: 1, name: 'Arroz Premium 1kg', category: 'Abarrotes', stock: 45, price: 12.90, trend: 'up' },
    { id: 2, name: 'Aceite Vegetal 1L', category: 'Abarrotes', stock: 28, price: 15.50, trend: 'down' },
    { id: 3, name: 'Leche Evaporada', category: 'Lácteos', stock: 36, price: 4.80, trend: 'up' }
  ];

  const activities = [
    { id: 1, action: 'Nueva venta', user: 'María López', time: 'Hace 5 minutos' },
    { id: 2, action: 'Actualización de inventario', user: 'Juan Pérez', time: 'Hace 30 minutos' },
    { id: 3, action: 'Nuevo cliente registrado', user: 'Sistema', time: 'Hace 1 hora' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-70">Total Ventas</p>
                <h2 className="card-title text-2xl font-bold">S/ 10,250</h2>
                <div className="flex items-center text-success mt-1">
                  <FaArrowUp className="mr-1" size={12} />
                  <p className="text-xs">12% desde el mes pasado</p>
                </div>
              </div>
              <div className="bg-primary/15 text-primary p-4 rounded-xl">
                <FaShoppingCart size={24} />
              </div>
            </div>
            <progress className="progress progress-primary mt-4" value="70" max="100"></progress>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300" onClick={() => handleNavigation('/productos')}>
          <div className="card-body cursor-pointer">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-70">Productos</p>
                <h2 className="card-title text-2xl font-bold">124</h2>
                <div className="flex items-center text-success mt-1">
                  <FaArrowUp className="mr-1" size={12} />
                  <p className="text-xs">8 nuevos productos</p>
                </div>
              </div>
              <div className="bg-accent/15 text-accent p-4 rounded-xl">
                <FaBoxOpen size={24} />
              </div>
            </div>
            <progress className="progress progress-accent mt-4" value="55" max="100"></progress>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300" onClick={() => handleNavigation('/clientes')}>
          <div className="card-body cursor-pointer">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-70">Clientes</p>
                <h2 className="card-title text-2xl font-bold">45</h2>
                <div className="flex items-center text-success mt-1">
                  <FaArrowUp className="mr-1" size={12} />
                  <p className="text-xs">5 esta semana</p>
                </div>
              </div>
              <div className="bg-secondary/15 text-secondary p-4 rounded-xl">
                <FaUsers size={24} />
              </div>
            </div>
            <progress className="progress progress-secondary mt-4" value="45" max="100"></progress>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300" onClick={() => handleNavigation('/categorias')}>
          <div className="card-body cursor-pointer">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-70">Categorías</p>
                <h2 className="card-title text-2xl font-bold">12</h2>
                <div className="flex items-center opacity-70 mt-1">
                  <p className="text-xs">Sin cambios</p>
                </div>
              </div>
              <div className="bg-info/15 text-info p-4 rounded-xl">
                <FaTags size={24} />
              </div>
            </div>
            <progress className="progress progress-info mt-4" value="80" max="100"></progress>
          </div>
        </div>
      </div>

      {/* Gráficos y resumen */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Gráfico principal */}
        <div className="card bg-base-100 shadow-xl xl:col-span-2">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title">Rendimiento de ventas</h2>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-xs">
                  <FaEllipsisV />
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a>Ver reporte completo</a></li>
                  <li><a>Descargar datos</a></li>
                  <li><a>Comparar periodos</a></li>
                </ul>
              </div>
            </div>
            <div className="tabs tabs-boxed bg-base-200 inline-flex mb-4">
              <a className="tab tab-active">Este mes</a>
              <a className="tab">Últimos 3 meses</a>
              <a className="tab">Este año</a>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorClientes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip contentStyle={{borderRadius: '8px'}} />
                  <Legend />
                  <Area type="monotone" dataKey="ventas" stroke="#8884d8" fillOpacity={1} fill="url(#colorVentas)" />
                  <Area type="monotone" dataKey="clientes" stroke="#82ca9d" fillOpacity={1} fill="url(#colorClientes)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-end mt-2">
              <button className="btn btn-sm btn-primary">Ver análisis completo</button>
            </div>
          </div>
        </div>

        {/* Panel de actividad reciente */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Actividad reciente</h2>
            <div className="space-y-4">
              {activities.map(activity => (
                <div key={activity.id} className="flex items-start border-b border-base-200 pb-3 last:border-0">
                  <div className="avatar placeholder mr-3">
                    <div className="bg-primary text-primary-content mask mask-squircle w-10">
                      <span className="text-xs">
                        {activity.action.includes('venta') ? 'V' : 
                         activity.action.includes('inventario') ? 'I' : 'C'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm opacity-70">por {activity.user}</p>
                    <p className="text-xs opacity-50">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-sm btn-ghost">Ver todo el historial</button>
            </div>
          </div>
        </div>
      </div>

      {/* Distribución por categoría y productos populares */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Distribución por categoría</h2>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-xs">{category.name}</span>
                </div>
              ))}
            </div>
            <Link to="/categorias" className="btn btn-sm btn-ghost mt-2 w-full">Ver todas las categorías</Link>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl xl:col-span-2">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title">Productos populares</h2>
              <Link to="/productos" className="btn btn-sm btn-ghost">Ver todos</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Tendencia</th>
                  </tr>
                </thead>
                <tbody>
                  {popularProducts.map(product => (
                    <tr key={product.id} className="hover">
                      <td className="font-medium">{product.name}</td>
                      <td><span className="badge badge-ghost">{product.category}</span></td>
                      <td>
                        <div className="flex items-center">
                          <span className={`${product.stock < 30 ? 'text-error' : 'text-success'}`}>
                            {product.stock}
                          </span>
                          <progress 
                            className={`progress ${product.stock < 30 ? 'progress-error' : 'progress-success'} w-10 ml-2`} 
                            value={product.stock} 
                            max="100"
                          ></progress>
                        </div>
                      </td>
                      <td>S/ {product.price.toFixed(2)}</td>
                      <td>
                        {product.trend === 'up' ? (
                          <span className="text-success"><FaArrowUp /></span>
                        ) : (
                          <span className="text-error"><FaArrowDown /></span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Transacciones recientes */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Transacciones recientes</h2>
            <Link to="/ventas" className="btn btn-sm btn-ghost">Ver todas</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map(tx => (
                  <tr key={tx.id} className="hover">
                    <td>#{tx.id}</td>
                    <td>{tx.customer}</td>
                    <td>{tx.items}</td>
                    <td>S/ {tx.total.toFixed(2)}</td>
                    <td>{tx.date}</td>
                    <td>
                      <span className={`badge ${tx.status === 'completado' ? 'badge-success' : 'badge-warning'}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td>
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-xs">
                          <FaEllipsisV />
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                          <li><a>Ver detalles</a></li>
                          <li><a>Imprimir</a></li>
                          <li><a>Exportar</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
