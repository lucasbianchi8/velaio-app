import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDatepickerModule, NgbCalendar, NgbAlertModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from '../success-modal/success-modal.component';

@Component({
  selector: 'app-create-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgClass, NgbDatepickerModule, NgbAlertModule, NgFor, NgIf],
  templateUrl: './create-edit-task.component.html',
  styleUrl: './create-edit-task.component.scss'
})
export class CreateEditTaskComponent {

  ngbCalendar = inject(NgbCalendar);
  today = this.ngbCalendar.getToday();

  private modalService = inject(NgbModal);

  taskForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      limitDate: new FormControl('', [Validators.required]),
      persons: new FormArray([
        this.createPersonForm()
      ])
    }
  );

  createPersonForm(name = '', years= ''): FormGroup {
    return new FormGroup(
      {
        completeName: new FormControl(name, [Validators.required, Validators.minLength(5)]),
        years: new FormControl(years, [Validators.required, Validators.min(18), Validators.max(100)])
      }
    );
  }
 
  getValidationClassByControl(controlName: FormControl | AbstractControl): string {
    if (controlName.dirty) {
      return controlName.valid ? 'is-valid' : 'is-invalid';
    }
    return '';
  }

  addPerson(): void {
    const name = this.taskForm.controls.persons.at(0).controls['completeName'].value;
    const years = this.taskForm.controls.persons.at(0).controls['years'].value;
    (this.taskForm.controls.persons as FormArray).push(this.createPersonForm(name, years));
    this.taskForm.controls.persons.at(0).reset();
  }

  deletePerson(index: number): void {
    this.taskForm.controls.persons.controls.splice(index, 1);
    this.taskForm.updateValueAndValidity();
  }

  saveTask(): void {
    const task = {
      name: this.taskForm.controls.name.value,
      limitDate: this.taskForm.controls.limitDate.value,
      // persons: this.taskForm.controls.persons.value
    }
    this.modalService.open(SuccessModalComponent);
    // this.taskForm.reset();
  }
}
