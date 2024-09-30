import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home/home.component').then(x => x.HomeComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('./components/create-edit-task/create-edit-task.component').then(x => x.CreateEditTaskComponent)
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/create-edit-task/create-edit-task.component').then(x => x.CreateEditTaskComponent)
    },
    {
        path: 'list',
        loadComponent: () => import('./components/list-tasks/list-tasks.component').then(x => x.ListTasksComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
