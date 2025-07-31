import { inject } from '@angular/core'
import { Router, Routes } from '@angular/router'
import { authGuard } from '@core/guards/auth/auth.guard'
import { logedGuard } from '@core/guards/loged/loged.guard'
import { AuthenticationService } from '@core/services/auth.service'
import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout.component'
import { MainLayoutComponent } from '@layouts/main-layout/main-layout.component'
import { ComingSoonComponent } from '@views/extra/coming-soon/coming-soon.component'
import { Error404Component } from '@views/extra/error404/error404.component'
import { MaintenanceComponent } from '@views/extra/maintenance/maintenance.component'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/sign-in',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate:[authGuard],
    loadChildren: () =>
      import('./views/views.route').then((mod) => mod.VIEWS_ROUTES),
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate:[logedGuard],
    loadChildren: () =>
      import('./views/auth/auth.route').then((mod) => mod.AUTH_ROUTES),
  },
  // {
  //   path: 'pages',
  //   component: AuthLayoutComponent,
  //   loadChildren: () =>
  //   import('./views/extra/extra.route').then((mod) => mod.OTHER_PAGE_ROUTE),
  // }
]
