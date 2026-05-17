import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./Home/home-principal-component/home-principal-component.component')
                .then(c => c.HomePrincipalComponentComponent),

        children: [
            {
                path: '',
                loadChildren: () =>
                    import('../PageContent/productos.routes')
                        .then(r => r.PRODUCTOS_ROUTES)
            }

        ]
    },



];