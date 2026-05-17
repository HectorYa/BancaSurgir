import { Routes } from '@angular/router';

export const PRODUCTOS_ROUTES: Routes = [

    {
        path: 'nosotros',
        loadComponent: () =>
            import('./SecNosotros/Nosotros/nosotros-component.component')
                .then(c => c.NosotrosComponentComponent)
    },
    {
        path: 'canal-pago',
        loadComponent: () =>
            import('./SecCanalPago/CanalPagos/canal-pago-component.component')
                .then(c => c.CanalPagoComponentComponent)
    },
    {
        path: 'ayuda',
        loadComponent: () =>
            import('./Ayuda/ayuda-component/ayuda-component.component')
                .then(c => c.AyudaComponentComponent)
    },
    {
        path: 'productos',
        loadComponent: () =>
            import('./SecProductos/Plazofijo/plazo-fijo-component.component')
                .then(c => c.PlazoFijoComponentComponent)
    }

];