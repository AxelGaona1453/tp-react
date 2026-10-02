# Comedor IPF

Aplicación multiplataforma para consultar el menú del Instituto Politécnico Formosa, armar pedidos y seguir su turno. La cocina recibe cada pedido en orden de llegada y mantiene un historial de los ya atendidos.

## Ejecutar

```bash
npm install
npx expo start
```

Para abrir la versión web: `npx expo start --web`. El proyecto usa Expo SDK 57, TypeScript, rutas tipadas y el scheme `comedoripf`.

Credenciales de demostración para cocina: usuario `cocina`, clave `1234`.

## Rutas y navegadores

```text
src/app/
├── _layout.tsx                    Stack raíz, sesión protegida y anchor (tabs)
├── +not-found.tsx                 Página 404
├── (tabs)/
│   ├── _layout.tsx                Tabs JavaScript
│   ├── index.tsx                  /
│   ├── menu/
│   │   ├── _layout.tsx            Stack de la pestaña Menú
│   │   ├── index.tsx              /menu
│   │   └── [id].tsx               /menu/[id]
│   └── carrito/
│       ├── _layout.tsx            Stack de Carrito y hoja inferior de nota
│       ├── index.tsx              /carrito
│       └── nota.tsx               /carrito/nota
├── categorias/[categoria].tsx    /categorias/[categoria], Stack raíz
├── buscar.tsx                     /buscar?q=&categoria=, Stack raíz
├── confirmar.tsx                  /confirmar, modal del Stack raíz
├── turno/[numero].tsx             /turno/[numero], Stack raíz
├── login.tsx                      /login, modal protegido sin sesión
├── pedido.tsx                     /pedido, redirect a /carrito
├── ayuda/
│   ├── index.tsx                  /ayuda
│   └── [...slug].tsx              /ayuda/... (catch-all)
└── (cocina)/
    ├── _layout.tsx                Drawer, disponible con sesión
    └── cocina/
        ├── index.tsx              /cocina
        └── atendidos.tsx           /cocina/atendidos
```

`/menu/[id]` pertenece al Stack anidado dentro de Menú; las pestañas siguen visibles al abrir el detalle. Categorías, búsqueda, confirmación y turnos usan el Stack raíz. `GestureHandlerRootView` envuelve la navegación para el Drawer.

## Estructuras y estado

- `src/estructuras/Pila.ts`: historial LIFO genérico para deshacer y para pedidos atendidos.
- `src/estructuras/Cola.ts`: FIFO genérica con índice de frente y compactación ocasional; no usa `shift()`.
- `src/context/AppContext.tsx`: sesión, carrito, nota, cola de pedidos y pilas, compartidos desde el layout raíz.
- `src/data/platos.ts`: 12 platos de ejemplo distribuidos en cuatro categorías.
- `src/components/DondeEstoy.tsx`: muestra pathname, segmentos y parámetros; se activa cambiando `DEBUG` a `true`.

Al confirmar, `confirmarPedido()` encola el pedido y `/confirmar` navega con `router.replace('/turno/[numero]')`. Se usa `replace` para que Atrás no vuelva a confirmar ni permita duplicar el pedido. El tiempo estimado es de tres minutos por cada pedido que esté delante.

## Deep link de prueba

- Build propia: `comedoripf://menu/7`
- Expo Go: `exp://<IP-DE-LA-COMPUTADORA>:8081/--/menu/7`
- Web local: `http://localhost:8081/menu/7`

El segmento `/--/` separa la dirección del servidor de Expo Go de la ruta de la aplicación. Sustituí la IP por la que muestra `npx expo start`.

## Evidencia para la entrega

Capturas del diseño actualizado, generadas en viewport móvil:

- [Inicio](evidencia/inicio.png)
- [Menú](evidencia/menu.png)
- [Detalle del plato](evidencia/detalle.png)
- [Buscar](evidencia/buscar.png)
- [Carrito con Deshacer](evidencia/carrito.png)
- [Confirmación](evidencia/confirmar.png)
- [Turno confirmado](evidencia/turno.png)
- [Login de cocina](evidencia/login.png)
- [Cocina atendiendo](evidencia/cocina.png)
- [Historial de atendidos](evidencia/atendidos.png)
- [Página 404](evidencia/404.png)

Los datos se mantienen en memoria durante la sesión de la app y se reinician al recargar.

Las respuestas de las Partes A–F están en [RESPUESTAS.md](RESPUESTAS.md).
