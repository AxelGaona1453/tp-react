# Respuestas · Expo Router

## Parte A · Pila y cola

### A1. Conceptos

- LIFO (“último en entrar, primero en salir”) corresponde a la pila. FIFO (“primero en entrar, primero en salir”) corresponde a la cola.
- En la pila se agrega y se quita por el tope. En la cola se agrega al final y se quita por el frente.
- Pila: platos apilados / historial de pantallas. Cola: fila del comedor / pedidos pendientes.

### A2. Seguimiento de pila

1. `tope()` devuelve `'Perfil'`.
2. `pop()` devuelve `'Perfil'` y lo quita.
3. `tope()` devuelve `'Productos'`.
4. `vacia` devuelve `false`.

Estado final, de base a tope: `['Inicio', 'Productos']`.

### A3. Seguimiento de cola

1. `frente()` devuelve `'Beto'`.
2. `desencolar()` devuelve `'Beto'`.
3. `vacia` devuelve `false`.

Estado final, de frente a final: `['Caro', 'Dani']`.

### A4. Implementación

- `#items` es un campo privado: evita que código externo modifique directamente el estado interno.
- `shift()` desplaza y reindexa los elementos restantes. Una cola eficiente guarda un índice de frente y lo incrementa; puede compactar el arreglo de manera ocasional.
- La pila quita con `pop()` por el final. La cola quita por el frente, con un índice en esta implementación. Son extremos y órdenes distintos.

### A5. Cola eficiente

La clase `Cola<T>` en `src/estructuras/Cola.ts` implementa `encolar`, `desencolar`, `frente`, `vacia`, `tamanio` y `aArray` con campos privados y sin `shift()`.

### A6. Router

- El historial de un Stack es una pila: arriba queda la pantalla visible y Atrás hace pop.
- Las acciones de navegación se despachan en secuencia; dos enlaces rápidos no deben mezclar el estado de navegación.

## Parte B · Rutas basadas en archivos

### B1. Archivo a URL

| Archivo | URL o función |
| --- | --- |
| `src/app/(tabs)/index.tsx` | `/`; la carpeta entre paréntesis no aparece en la URL |
| `src/app/acerca.tsx` | `/acerca` |
| `src/app/(tabs)/perfil.tsx` | `/perfil` |
| `src/app/(tabs)/productos/index.tsx` | `/productos` |
| `src/app/(tabs)/productos/[id].tsx` | `/productos/:id` |
| `src/app/docs/[...slug].tsx` | `/docs/...`; segmentos catch-all |
| `src/app/_layout.tsx` | Layout de las rutas, no una pantalla visitable |
| `src/app/+not-found.tsx` | Pantalla para rutas inexistentes |
| `src/app/Boton.tsx` | Crea una ruta accidental; los componentes van fuera de `app` |

### B2. URL a archivo

- `/categorias/bebidas`: `src/app/categorias/[categoria].tsx`.
- `/buscar?q=mate&categoria=kiosco`: `src/app/buscar.tsx`.
- `/ayuda/pagos/tarjeta` y `/ayuda/horarios`: `src/app/ayuda/[...slug].tsx`.
- `/ayuda`: `src/app/ayuda/index.tsx`.

### B3. Verdadero o falso

- a) Falso: las rutas se generan por archivos.
- b) Falso: `_layout.tsx` configura un navegador.
- c) Verdadero: `(tabs)` es un grupo sin segmento URL.
- d) Falso: conviene `npx expo install`, que elige versiones compatibles con Expo.
- e) Verdadero: `expo-router/entry` es la entrada configurada.
- f) Verdadero: `/_sitemap` permite inspeccionar las rutas.
- g) Verdadero: `docs/index.tsx` resuelve `/docs` antes del catch-all.
- h) Verdadero para este práctico: se usa Expo Router 57 con SDK 57.

## Parte C · Navegación

### C1. Métodos de router

- `push`: agrega una pantalla al tope.
- `navigate`: va a una ruta existente o la agrega si no está en la pila.
- `replace`: reemplaza la pantalla actual.
- `back`: vuelve a la pantalla anterior.
- `dismissTo`: descarta pantallas hasta la ruta indicada.
- `dismissAll`: vuelve a la primera pantalla del Stack.
- `canGoBack`: indica si existe una pantalla anterior.
- `setParams`: actualiza parámetros sin agregar una pantalla.

### C2. Simulación de pila

1. `[/productos, /productos/1]`
2. `[/productos, /productos/1, /productos/2]`
3. `[/productos, /productos/1, /productos/2, /productos/5]`
4. `[/productos, /productos/1, /productos/2, /productos/5, /perfil]`
5. `[/productos, /productos/1, /productos/2, /productos/5, /buscar]`
6. `[/productos, /productos/1, /productos/2, /productos/5]`
7. `[/productos]`
8. `false`.

### C3. ¿Link o router?

- a) `<Link>` para abrir el producto al tocarlo.
- b) `router.replace('/exito')` tras completar el guardado si no se debe volver al formulario.
- c) `router.back()` para cerrar el modal.
- d) `router.replace('/')` después del login para no regresar al login con Atrás.
- e) `router.dismissTo('/pedidos')` para volver a la lista.

### C4. Código

```tsx
<Link href={{ pathname: '/productos/[id]', params: { id: '8' } }}>Ver producto 8</Link>
<Link href="/perfil" push>Perfil</Link>
<Link href="/carrito" asChild>
  <Pressable><Text>Ir al carrito</Text></Pressable>
</Link>
```

### C5. Link en web y móvil

En web, el enlace es un `<a href>`: se puede abrir en otra pestaña, copiar y ver el destino. En móvil no hay barra de direcciones, pero el enlace mantiene navegación declarativa y rutas compartibles/deep links.

## Parte D · Navegadores

### D1. Stack, Tabs y Drawer

| Navegador | ¿Apila? | Interacción | Uso habitual |
| --- | --- | --- | --- |
| Stack | Sí | Avanzar y volver | Lista y detalle |
| Tabs | No; conserva cada sección | Barra de pestañas | Secciones principales |
| Drawer | No | Menú lateral | Herramientas secundarias |

En SDK 57, Tabs JavaScript se importa de `expo-router/js-tabs`; Drawer, de `expo-router/drawer`.

### D2. Pila por pestaña

Al regresar a Productos se ve el detalle del producto 4: cada tab conserva su estado y su propio Stack. YouTube es un ejemplo de ese patrón.

### D3. Ubicación

- a) Detalle de producto: Stack de la pestaña Productos.
- b) Confirmación modal: Stack raíz, por encima de Tabs.
- c) Login modal: Stack raíz.
- d) Pedidos anteriores: sección Perfil y su Stack.

### D4. Configuración

- a) `screenOptions` aplica opciones por defecto al Stack; `options` modifica una pantalla.
- b) Se oculta el encabezado de `(tabs)` para no superponer dos headers.
- c) Sí; Expo Router la detecta, y declararla permite configurar opciones propias.
- d) Ejemplos: `modal`, `formSheet`, `transparentModal`, `fullScreenModal`; una hoja inferior puede usar `formSheet`.
- e) Renderizar `<Stack.Screen options={{ title: 'Producto 7' }} />` en la pantalla.

### D5. SDK 57

- a) Tabs JavaScript se importa desde `expo-router/js-tabs`; la alternativa experimental es `expo-router/native-tabs`.
- b) Drawer usa Reanimated, Worklets y Gesture Handler; se envuelve la raíz en `GestureHandlerRootView`.
- c) No hace falta agregar `@react-navigation/drawer` por separado en esta configuración del SDK.
- d) `router.back()` actúa sobre el navegador más interno con historial.

## Parte E · Rutas dinámicas y parámetros

### E1. Tipo de id

El parámetro llega como texto. Convertirlo antes de compararlo con el id numérico:

```tsx
const { id } = useLocalSearchParams<{ id: string }>();
const producto = productos.find((item) => item.id === Number(id));
```

### E2. Catch-all

- `/docs/react`: `slug = ['react']`.
- `/docs/react/hooks/useState`: `slug = ['react', 'hooks', 'useState']`.
- `/docs`: usar `docs/index.tsx`; un catch-all obligatorio no captura el path vacío.

### E3. URL y búsqueda

- Scheme: `rutasipf`; path: `/buscar`; parámetros: `q=mate`, `categoria=bebidas`.
- `useLocalSearchParams()` devuelve `{ q: 'mate', categoria: 'bebidas' }`.
- No hacen falta corchetes para query params: se leen del search string, no del path.
- `router.setParams` mantiene la URL compartible y actualiza la búsqueda sin apilar una ruta en cada tecla.

### E4. Hooks

| Hook | `/productos/3` | `/buscar?q=chipa` |
| --- | --- | --- |
| `usePathname()` | `/productos/3` | `/buscar` |
| `useSegments()` | `['productos', '[id]']` | `['buscar']` |
| `useLocalSearchParams()` | `{ id: '3' }` | `{ q: 'chipa' }` |

### E5. Local y global

- `useLocalSearchParams` devuelve parámetros de la ruta enfocada; `useGlobalSearchParams`, los de la URL global. Se prefiere local para aislar la pantalla.
- `useFocusEffect` vuelve a ejecutar una tarea al recuperar foco, por ejemplo refrescar la cuenta al volver a Perfil.
- La ruta dinámica acepta cualquier segmento; la pantalla debe validar si el producto existe.

## Parte F · Guardas y deep links

### F1. Redirect

`<Redirect href="/productos" />` navega al montarse, equivalente a reemplazar la ruta. Reemplazar evita regresar a la pantalla que originó la redirección y entrar en un ciclo.

### F2. Stack protegido

```tsx
<Stack.Protected guard={conSesion}>
  <Stack.Screen name="privado" />
</Stack.Protected>
<Stack.Protected guard={!conSesion}>
  <Stack.Screen name="login" options={{ presentation: 'modal' }} />
</Stack.Protected>
```

- a) Con `guard={false}`, la pantalla se retira del Stack.
- b) Al iniciar sesión cambia la guarda; el login deja de existir y se elimina sin llamar a `back()`.
- c) Se intenta navegar a una ruta protegida que no está disponible. Hay que comprobar sesión y configurar un anchor válido.
- d) Centraliza el acceso y evita duplicar redirects y estados intermedios en cada pantalla.

### F3. 404, anchor y rutas tipadas

- `src/app/+not-found.tsx` muestra la ruta inexistente.
- `unstable_settings.anchor = '(tabs)'` deja Inicio debajo al abrir un deep link.
- Las rutas tipadas marcan hrefs inexistentes durante el chequeo TypeScript; Expo las genera bajo `.expo/types`.

### F4. Deep links

- Build propia: `comedoripf://menu/7`.
- Expo Go: `exp://192.168.1.20:8081/--/menu/7`.
- Web: `http://localhost:8081/menu/7`.

`/--/` separa el host de Expo Go de la ruta. En Expo Go se usa el scheme `exp://` del contenedor, no el scheme propio de la build.

### F5. Errores comunes

- a) El hijo de `asChild` debe aceptar correctamente los props reenviados; usar un `Pressable` compatible y no envolver mal el arreglo de estilos.
- b) Un archivo dentro de `app` se convierte en ruta. Mover componentes a `src/components`.
- c) `push('/')` deja Login debajo; usar `replace('/')`.
- d) `npm install` puede elegir una versión incompatible con el SDK; usar `npx expo install`.
