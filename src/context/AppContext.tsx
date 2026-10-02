import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Plato } from '@/data/platos';
import { Cola } from '@/estructuras/Cola';
import { Pila } from '@/estructuras/Pila';

export interface ItemCarrito {
  plato: Plato;
  cantidad: number;
}

export interface Pedido {
  numero: number;
  items: ItemCarrito[];
  total: number;
  nota: string;
  fecha: Date;
}

interface AppContextValue {
  usuario: string | null;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;
  carrito: ItemCarrito[];
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => Plato | undefined;
  pilaDeshacer: Pila<Plato>;
  nota: string;
  setNota: (nota: string) => void;
  pedidos: Cola<Pedido>;
  pedidosPendientes: Pedido[];
  atendidos: Pila<Pedido>;
  historialAtendidos: Pedido[];
  confirmarPedido: () => number | undefined;
  atenderSiguiente: () => Pedido | undefined;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useAppContext() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useAppContext debe usarse dentro de AppProvider');
  return value;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [pilaDeshacer] = useState(() => new Pila<Plato>());
  const [pedidos] = useState(() => new Cola<Pedido>());
  const [pedidosPendientes, setPedidosPendientes] = useState<Pedido[]>([]);
  const [atendidos] = useState(() => new Pila<Pedido>());
  const [historialAtendidos, setHistorialAtendidos] = useState<Pedido[]>([]);
  const [nota, setNota] = useState('');
  const [contadorPedidos, setContadorPedidos] = useState(0);

  function iniciarSesion(user: string, clave: string) {
    if (user !== 'cocina' || clave !== '1234') return false;
    setUsuario(user);
    return true;
  }

  function agregarAlCarrito(plato: Plato) {
    pilaDeshacer.push(plato);
    setCarrito((actual) => {
      const existente = actual.find((item) => item.plato.id === plato.id);
      if (existente) return actual.map((item) => item.plato.id === plato.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      return [...actual, { plato, cantidad: 1 }];
    });
  }

  function deshacerUltimo() {
    const plato = pilaDeshacer.pop();
    if (!plato) return undefined;
    setCarrito((actual) => actual.flatMap((item) => {
      if (item.plato.id !== plato.id) return [item];
      return item.cantidad > 1 ? [{ ...item, cantidad: item.cantidad - 1 }] : [];
    }));
    return plato;
  }

  function confirmarPedido() {
    if (carrito.length === 0) return undefined;
    const numero = contadorPedidos + 1;
    const total = carrito.reduce((suma, item) => suma + item.plato.precio * item.cantidad, 0);
    pedidos.encolar({ numero, items: [...carrito], total, nota, fecha: new Date() });
    setPedidosPendientes(pedidos.aArray());
    setContadorPedidos(numero);
    setCarrito([]);
    setNota('');
    while (!pilaDeshacer.vacia) pilaDeshacer.pop();
    return numero;
  }

  function atenderSiguiente() {
    const pedido = pedidos.desencolar();
    if (pedido) {
      atendidos.push(pedido);
      setPedidosPendientes(pedidos.aArray());
      setHistorialAtendidos(atendidos.aArray());
    }
    return pedido;
  }

  return (
    <AppContext.Provider value={{
      usuario,
      iniciarSesion,
      cerrarSesion: () => setUsuario(null),
      carrito,
      agregarAlCarrito,
      deshacerUltimo,
      pilaDeshacer,
      nota,
      setNota,
      pedidos,
      pedidosPendientes,
      atendidos,
      historialAtendidos,
      confirmarPedido,
      atenderSiguiente,
    }}>
      {children}
    </AppContext.Provider>
  );
}