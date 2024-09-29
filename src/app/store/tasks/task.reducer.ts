import { createReducer, on } from '@ngrx/store';

import { Task } from './task.model';
import { TaskActions } from './tasks.actions';

export const initialState: ReadonlyArray<Task> = [];

export const tasksReducer = createReducer(
  initialState,
  on(TaskActions.add, (state, { task }) => {
    return [...state, task]
  })
);