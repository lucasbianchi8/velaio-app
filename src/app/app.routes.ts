import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(x => x.HomeComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('./create-edit-task/create-edit-task.component').then(x => x.CreateEditTaskComponent)
    },
    {
        path: 'list',
        loadComponent: () => import('./list-tasks/list-tasks.component').then(x => x.ListTasksComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
