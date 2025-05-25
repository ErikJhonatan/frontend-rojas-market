# Rojas Market · Frontend

Interfaz React para gestión de un minimarket: dashboard, categorías, productos, ventas, clientes y usuarios.

## Qué contiene

- Rutas para dashboard, categorías, productos, ventas, clientes y usuarios.
- Componentes de layout y navegación.
- Una capa de servicios para productos, categorías y autenticación.
- React 19, Vite, Tailwind CSS, daisyUI y Recharts.

## Estructura

`src/pages/` contiene las pantallas, `src/components/` los componentes y `src/services/api.js` la comunicación con la API.

## Desarrollo

Desde la raíz, instala las dependencias con `npm install` y usa `npm run dev` para iniciar Vite. La configuración de los endpoints debe concordar con el backend que utilices.

## Estado de integración

Las funciones `createOrderAPI` y `addProductToOrderAPI` de `src/services/api.js` simulan respuestas; la creación de pedidos no representa una integración completa. Axios se declara como dependencia directa. Las respuestas simuladas incluyen `simulated: true`. Esos puntos requieren trabajo antes de presentar una demo funcional.

Repositorio relacionado: [backend-rojas-market](https://github.com/ErikJhonatan/backend-rojas-market), mantenido como fork. Esta revisión documentó el código sin ejecutar la aplicación ni pruebas.

## Cambios de comportamiento

El carrito rechaza cantidades inválidas o superiores al stock disponible cuando el producto lo declara. Sus datos guardados se cargan al inicializar el estado. El checkout continúa siendo simulado, devuelve `simulated: true` y lo indica en su mensaje de resultado.
