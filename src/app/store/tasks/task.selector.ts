import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Task, TaskStatus } from './task.model';

export const selectTasks = createFeatureSelector<ReadonlyArray<Task>>('tasks');

export const selectTasksByStatus = (status: TaskStatus) => createSelector(
    selectTasks,
    (tasks) => {
        return tasks.filter((task) => task.status === status);
    }
);