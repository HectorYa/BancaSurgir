import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promociones-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promociones-component.component.html',
  styleUrl: './promociones-component.component.css'
})
export class PromocionesComponentComponent {
  promociones = [
    {
      titulo: 'Campaña Actualización de Datos SURGIR 2026',
      vigencia: '15 de mayo de 2026 - 10 de julio de 2026',
      imagen: 'assets/promo1.jpg',
      btnPrincipal: 'Participar'
    },
    {
      titulo: 'Campaña Decidir bien, te paga más',
      vigencia: '15 de abril de 2026 - 31 de mayo de 2026',
      imagen: 'assets/promo2.jpg',
      btnPrincipal: 'Abre tu Depósito'
    },
    // ... más promociones
  ];
}
