export type Categoria = 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';

export interface Plato {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
}

export const categorias: Categoria[] = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'];

export const platos: Plato[] = [
  { id: 1, nombre: 'Medialunas', precio: 1500, descripcion: 'Medialunas de manteca, horneadas hoy x3', categoria: 'desayuno' },
  { id: 2, nombre: 'Tostadas con mermelada', precio: 1200, descripcion: 'Pan tostado, manteca y mermelada de estación', categoria: 'desayuno' },
  { id: 3, nombre: 'Chipá', precio: 800, descripcion: 'Chipá casero de almidón de mandioca', categoria: 'desayuno' },
  { id: 4, nombre: 'Milanesa con puré', precio: 3500, descripcion: 'Milanesa dorada con puré de papas cremoso', categoria: 'almuerzo' },
  { id: 5, nombre: 'Empanadas x3', precio: 2500, descripcion: 'Empanadas de carne cortada a cuchillo', categoria: 'almuerzo' },
  { id: 6, nombre: 'Guiso de lentejas', precio: 2800, descripcion: 'Lentejas, vegetales y chorizo colorado', categoria: 'almuerzo' },
  { id: 7, nombre: 'Pollo al horno', precio: 3200, descripcion: 'Pollo al horno con papas y hierbas', categoria: 'almuerzo' },
  { id: 8, nombre: 'Agua mineral', precio: 500, descripcion: 'Agua sin gas, botella de 500 ml', categoria: 'bebidas' },
  { id: 9, nombre: 'Gaseosa cola', precio: 800, descripcion: 'Gaseosa fría, botella de 500 ml', categoria: 'bebidas' },
  { id: 10, nombre: 'Jugo de naranja', precio: 700, descripcion: 'Jugo de naranja natural', categoria: 'bebidas' },
  { id: 11, nombre: 'Alfajor', precio: 600, descripcion: 'Alfajor de maicena con dulce de leche', categoria: 'kiosco' },
  { id: 12, nombre: 'Galletitas', precio: 500, descripcion: 'Paquete de galletitas surtidas', categoria: 'kiosco' },
];

export const nombresCategoria: Record<Categoria, string> = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  bebidas: 'Bebidas',
  kiosco: 'Kiosco',
};