import React from 'react';

const Configuracion = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Configuración</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Cambiar contraseña</h2>
        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Contraseña actual</span>
          </label>
          <input type="password" placeholder="Contraseña actual" className="input input-bordered" />
        </div>
        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Nueva contraseña</span>
          </label>
          <input type="password" placeholder="Nueva contraseña" className="input input-bordered" />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Confirmar nueva contraseña</span>
          </label>
          <input type="password" placeholder="Confirmar nueva contraseña" className="input input-bordered" />
        </div>
        <button className="btn btn-primary">Cambiar contraseña</button>
      </div>

      <div className="divider"></div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Preferencias de notificaciones</h2>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Recibir notificaciones por email</span>
            <input type="checkbox" className="toggle toggle-primary" checked />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Recibir notificaciones de nuevos productos</span>
            <input type="checkbox" className="toggle toggle-primary" />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Recibir notificaciones de ofertas</span>
            <input type="checkbox" className="toggle toggle-primary" checked />
          </label>
        </div>
      </div>
      
      <button className="btn btn-primary">Guardar configuración</button>
    </div>
  );
};

export default Configuracion;
