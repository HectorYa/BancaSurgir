import { Routes } from '@angular/router';

export const PRODUCTOS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./Inicio/inicio-component/inicio-component.component')
                .then(c => c.InicioComponentComponent)
    },
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
        path: 'productos/plazo-fijo',
        loadComponent: () =>
            import('./SecProductos/Plazofijo/plazo-fijo-component.component')
                .then(c => c.PlazoFijoComponentComponent)
    },
    {
        path: 'productos/credito-mujeres',
        loadComponent: () =>
            import('./SecProductos/credito-mujeres/credito-mujeres.component')
                .then(c => c.CreditoMujeresComponent)
    },
    {
        path: 'productos/credito-prospera',
        loadComponent: () =>
            import('./SecProductos/credito-prospera/credito-prospera.component')
                .then(c => c.CreditoProsperaComponent)
    },
    {
        path: 'productos/credito-construyendo',
        loadComponent: () =>
            import('./SecProductos/credito-construyendo/credito-construyendo.component')
                .then(c => c.CreditoConstruyendoComponent)
    },
    {
        path: 'promociones',
        loadComponent: () =>
            import('./Promociones/promociones-component/promociones-component.component')
                .then(c => c.PromocionesComponentComponent)
    },
    {
        path: 'productos',
        redirectTo: 'productos/plazo-fijo',
        pathMatch: 'full'
    }
];