import { Component } from '@angular/core';

@Component({
  selector: 'app-canal-pago-component',
  standalone: true,
  imports: [],
  templateUrl: './canal-pago-component.component.html',
  styleUrl: './canal-pago-component.component.css'
})
export class CanalPagoComponentComponent {

  bancos = [
    {
      nombre: 'Interbank',
      clase: 'interbank-banner',
      logo: 'assets/interbank.png',
      metodos: [
        { titulo: 'Banca por Internet y App', icon: 'bi-laptop' },
        { titulo: 'Agente Interbank', icon: 'bi-shop' }
      ]
    },
    // ... más bancos
  ];
}
