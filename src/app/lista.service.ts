import { Injectable } from '@angular/core';
import { Nota } from './nota';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private notasPorDia = new Map<string, Nota[]>();
  

  constructor() {
    // Inicializar el mapa con los días de la semana (opcional)
    this.notasPorDia.set('Lunes', this.getLocalStorage('Lunes'));
    this.notasPorDia.set('Martes', this.getLocalStorage('Martes'));
    this.notasPorDia.set('Miercoles', this.getLocalStorage('Miercoles'));
    this.notasPorDia.set('Jueves', this.getLocalStorage('Jueves'));
    this.notasPorDia.set('Viernes', this.getLocalStorage('Viernes'));
    this.notasPorDia.set('Sabado', this.getLocalStorage('Sabado'));
    this.notasPorDia.set('Domingo', this.getLocalStorage('Domingo'));
    this.notasPorDia.set('Pendiente', this.getLocalStorage('Pendiente'));
    this.notasPorDia.set('Idea', this.getLocalStorage('Idea'));
    
    // ... y así sucesivamente para los demás días
  }
  verificaLocalStorage(): boolean {
    try {
      // Prueba simple para verificar la disponibilidad de localStorage
      const testKey = '__test_key__';
      localStorage.setItem(testKey, 'test_value');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  

  
  
  setLocalStorage(key: string, data: Array<Nota>): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  
  

  getLocalStorage(key: string): Array<Nota> {
    if (this.verificaLocalStorage()) {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          // Intenta parsear el item como un Array de Nota
          return JSON.parse(item) as Array<Nota>;
        } catch (error) {
          console.error('Error al parsear datos del localStorage:', error);
          return []; // Devuelve un array vacío en caso de error
        }
      }
      return []; // Devuelve un array vacío si el item no existe
    }
    return []; // Devuelve un array vacío si localStorage no está disponible
  }
  


  agregarNota(dia: string, nota: Nota): void {
    // Obtener las notas del día, o un array vacío si no existen
    const notasDelDia = this.notasPorDia.get(dia) || [];
  
    // Agregar la nueva nota al array
    notasDelDia.push(nota);
  
    // Actualizar la entrada en el mapa
    this.notasPorDia.set(dia, notasDelDia);
  
    // Guardar el array actualizado en localStorage
    this.setLocalStorage(dia, notasDelDia);
  
  }
  

  // Método para obtener las notas de un día específico
  getNotas(dia: string): Nota[] {
    return this.notasPorDia.get(dia) || [];
  }


  removeNoteFromList(dia: string, id: number): void {
    const notasDelDia = this.notasPorDia.get(dia);
    if (notasDelDia) {
      const index = notasDelDia.findIndex(nota => nota.id === id);
      if (index !== -1) {
        // Eliminar la nota del array
        notasDelDia.splice(index, 1);
        // Actualizar el mapa
        this.notasPorDia.set(dia, notasDelDia);
        // Actualizar el localStorage
        this.setLocalStorage(dia, notasDelDia);
      }
    }
  }
}