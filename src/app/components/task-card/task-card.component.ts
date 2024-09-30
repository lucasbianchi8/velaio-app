import { AfterContentInit, Component, inject, Input } from '@angular/core';
import { Person, Task, TaskStatus } from '../../store/tasks/task.model';
import { NgClass, TitleCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { TaskActions } from '../../store/tasks/tasks.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [NgClass, TitleCasePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent implements AfterContentInit {

  store = inject(Store);
  router = inject(Router);
  isPending = false;
  @Input() task!: Task;

  ngAfterContentInit(): void {
    this.isPending = this.task.status === TaskStatus.PENDING;
  }

  skillsJoined(person: Person): string {
    return person.skills.join(', ');
  }

  completeTask() {
    this.store.dispatch(TaskActions.complete({id: this.task.id}));
  }

  editTask() {
    this.router.navigate(['edit', this.task.id])
  }
}
