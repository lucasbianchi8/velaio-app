import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskStatus } from '../../store/tasks/task.model';

@Component({
  selector: 'app-filter-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-task.component.html',
  styleUrl: './filter-task.component.scss'
})
export class FilterTaskComponent {
  
  @Output() filter = new EventEmitter<string | TaskStatus>();

  currrentIndex = 0;

  filters = [
    {
      text: 'Todos',
      filter: ''
    },
    {
      text: 'Completada',
      filter: TaskStatus.COMPLETED
    },
    {
      text: 'Pendientes',
      filter: TaskStatus.PENDING
    }];

  checkFilter(index: number) {
    this.currrentIndex = index;
    this.filter.emit(this.filters[this.currrentIndex].filter);
  }

}
