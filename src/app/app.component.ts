import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ListaService } from './lista.service';
import { Nota } from './nota';

interface Lista {
  // Define properties of the Lista object here (e.g., notes: Nota[])
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'calendario';
  hoveredNota: Nota | null = null;

  constructor(public listaService: ListaService) {}

  ngOnInit(): void {}

  onInputChange(event: Event, dia: string): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    console.log(`Input value for ${dia}: ${value}`);
  }

  postElemento(dia: string): void {
    const input = document.getElementById(dia) as HTMLInputElement;
    const listaInput = dia ?? '';  // Use nullish coalescing for safety

    if (input && listaInput) {   // Check for both input and dia
      const value = input.value;
      if (value) {
        this.listaService.agregarNota(dia, new Nota(listaInput, value, this.listaService.getNotas(dia).length)); // Call ListaService methods
        input.value = '';
      }
    }
  }

  deleteElemento(id: number, dia: string) {
    if (this.listaService.getNotas(dia)) {  // Check if list exists
      this.listaService.removeNoteFromList(dia, id);
    }
  }

  
}
