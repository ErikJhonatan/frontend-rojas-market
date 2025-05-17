import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaEdit, FaTrash, FaSave, FaImage } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Categorias = () => {
  const [categorias, setCategorias] = useState([
    { id: 1, nombre: 'Electrónicos', imagen: 'https://via.placeholder.com/50' },
    { id: 2, nombre: 'Ropa', imagen: 'https://via.placeholder.com/50' },
    { id: 3, nombre: 'Alimentos', imagen: 'https://via.placeholder.com/50' }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategoriaId, setCurrentCategoriaId] = useState(null);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  
  const onSubmit = (data) => {
    if (isEditMode) {
      // Actualizar categoría existente
      setCategorias(categorias.map(cat => 
        cat.id === currentCategoriaId ? { ...cat, ...data } : cat
      ));
      toast.success('¡Categoría actualizada con éxito!');
    } else {
      // Crear nueva categoría
      const newCategoria = {
        id: Date.now(),
        ...data
      };
      setCategorias([...categorias, newCategoria]);
      toast.success('¡Categoría creada con éxito!');
    }
    closeModal();
  };
  
  const openModal = () => {
    setIsEditMode(false);
    reset({ nombre: '', imagen: '' });
    setIsModalOpen(true);
  };
  
  const openEditModal = (categoria) => {
    setIsEditMode(true);
    setCurrentCategoriaId(categoria.id);
    setValue('nombre', categoria.nombre);
    setValue('imagen', categoria.imagen);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };
  
  const openDeleteDialog = (id) => {
    setCurrentCategoriaId(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    setCategorias(categorias.filter(cat => cat.id !== currentCategoriaId));
    setIsDeleteDialogOpen(false);
    toast.success('¡Categoría eliminada con éxito!');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Categorías</h1>
        <button 
          className="btn btn-primary" 
          onClick={openModal}
        >
          <FaPlus className="mr-2" /> Crear Categoría
        </button>
      </div>
      
      {/* Tabla de Categorías */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>
                  <img 
                    src={categoria.imagen} 
                    alt={categoria.nombre} 
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>
                <td>{categoria.nombre}</td>
                <td className="flex gap-2">
                  <button 
                    className="btn btn-sm btn-info"
                    onClick={() => openEditModal(categoria)}
                  >
                    <FaEdit /> Actualizar
                  </button>
                  <button 
                    className="btn btn-sm btn-error"
                    onClick={() => openDeleteDialog(categoria.id)}
                  >
                    <FaTrash /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Modal para Crear/Editar Categoría */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              {isEditMode ? 'Actualizar Categoría' : 'Crear Nueva Categoría'}
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Nombre</span>
                </label>
                <input 
                  type="text" 
                  className={`input input-bordered w-full ${errors.nombre ? 'input-error' : ''}`}
                  placeholder="Ingrese el nombre de la categoría"
                  {...register('nombre', { 
                    required: 'El nombre es obligatorio',
                    minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' }
                  })}
                />
                {errors.nombre && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.nombre.message}</span>
                  </label>
                )}
              </div>
              
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">URL de Imagen</span>
                </label>
                <div className="input-group">
                  <input 
                    type="text" 
                    className={`input input-bordered w-full ${errors.imagen ? 'input-error' : ''}`}
                    placeholder="Ingrese la URL de la imagen"
                    {...register('imagen', { 
                      required: 'La URL de la imagen es obligatoria',
                      pattern: {
                        value: /^(http|https):\/\/[^ "]+$/,
                        message: 'Ingrese una URL válida'
                      }
                    })}
                  />
                  <button className="btn btn-square" type="button">
                    <FaImage />
                  </button>
                </div>
                {errors.imagen && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.imagen.message}</span>
                  </label>
                )}
              </div>
              
              <div className="modal-action">
                <button type="button" className="btn" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  <FaSave className="mr-2" />
                  {isEditMode ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={closeModal}></div>
        </div>
      )}
      
      {/* Diálogo de Confirmación para Eliminar */}
      {isDeleteDialogOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirmar Eliminación</h3>
            <p className="py-4">¿Está seguro que desea eliminar esta categoría? Esta acción no se puede deshacer.</p>
            <div className="modal-action">
              <button 
                className="btn" 
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-error" 
                onClick={confirmDelete}
              >
                <FaTrash className="mr-2" /> Eliminar
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setIsDeleteDialogOpen(false)}></div>
        </div>
      )}
    </div>
  );
};

export default Categorias;
