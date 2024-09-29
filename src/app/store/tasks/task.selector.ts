import { createFeatureSelector } from '@ngrx/store';
import { Task } from './task.model';

export const selectTask = createFeatureSelector<ReadonlyArray<Task>>('tasks');
