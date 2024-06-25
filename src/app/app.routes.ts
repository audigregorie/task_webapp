import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'task-tab/:id',
    loadComponent: () =>
      import('./features/task-tab-detail/task-tab-detail.component').then(
        (m) => m.TaskTabDetailComponent,
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
