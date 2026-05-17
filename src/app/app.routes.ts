import { Routes } from '@angular/router';

import { LoginComponentComponent } from './Login/login-component/login-component.component';

export const routes: Routes = [

    {
        path: '',
        loadChildren: () =>
            import('./PagePrincipal/pages.routes')
                .then(r => r.routes)
    },




    {
        path: 'login',
        component: LoginComponentComponent
    },
];  