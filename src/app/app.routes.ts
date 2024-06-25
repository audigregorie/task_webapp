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
      import('./features/task-item/task-item.component').then(
        (m) => m.TaskItemComponent,
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
