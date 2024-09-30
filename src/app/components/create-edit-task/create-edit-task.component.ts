import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDatepickerModule, NgbCalendar, NgbAlertModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TaskActions } from '../../store/tasks/tasks.actions';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { TaskStatus } from '../../store/tasks/task.model';
import { validateName } from '../../utils/validators/validate-name';

@Component({
  selector: 'app-create-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgClass, NgbDatepickerModule, NgbAlertModule, NgFor, NgIf],
  templateUrl: './create-edit-task.component.html',
  styleUrl: './create-edit-task.component.scss'
})
export class CreateEditTaskComponent {

  private modalService = inject(NgbModal);
  private store = inject(Store);
  private ngbCalendar = inject(NgbCalendar);
  today = this.ngbCalendar.getToday();

  taskForm = this.createDefaultForm();

  private createDefaultForm() {
    return new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        limitDate: new FormControl(null, [Validators.required]),
        persons: new FormArray([
          this.createPersonForm()
        ])
      }
    );
  }

  private createPersonForm(completeName = '', years= '', skills?: any[]): FormGroup {
    let arr: FormGroup[] =[];
    skills?.forEach(x => {
      arr.push(this.createSkillForm(x))
    });

    if (arr.length === 0) {
      arr.push(this.createSkillForm());
    }
    
    const fg = new FormGroup(
      {
        completeName: new FormControl('', [Validators.required, Validators.minLength(5), validateName]),
        years: new FormControl('', [Validators.required, Validators.min(18)]),
        skills: new FormArray(arr)
      });
   
    if (completeName || years) {
      fg.controls.completeName.setValue(completeName);
      fg.controls.years.setValue(years);
    }

    return fg;
  }

  private createSkillForm(name = ''): FormGroup {
    const fg = new FormGroup(
      {
        skill: new FormControl('', [Validators.required])
      }
    );
    if (name) {
      fg.controls.skill.setValue(name);
      fg.updateValueAndValidity();
    }
    return fg;
  }

  getSkills(person: any) {
    return person.controls.skills.controls;
  }
 
  getValidationClassByControl(controlName: FormControl | AbstractControl): string {
    if (controlName.dirty) {
      return controlName.valid ? 'is-valid' : 'is-invalid';
    }
    return '';
  }

  addPerson(): void {
    const personInit = this.taskForm.controls.persons.at(0);
    const name = personInit.controls['completeName'].value;
    const years = personInit.controls['years'].value;
    const skills = personInit.controls['skills'].value.map((x: any) => x.skill);
    (this.taskForm.controls.persons as FormArray).push(this.createPersonForm(name, years, skills));
    this.taskForm.controls.persons.setControl(0, this.createPersonForm());
  }

  addSkill(skill: any, index: number): void {
    const skillName = skill.controls['skill'].value;
    const fm = (this.taskForm.controls.persons.at(index).controls['skills'] as FormArray);
    fm.push(this.createSkillForm(skillName))
    fm.at(0).reset();
  }

  deleteSkill(index: number, ind: number): void {
    const fm = (this.taskForm.controls.persons.at(index).controls['skills'] as FormArray);
    fm.removeAt(ind);
  }

  deletePerson(index: number): void {
    this.taskForm.controls.persons.controls.splice(index, 1);
    this.taskForm.updateValueAndValidity();
  }

  saveTask(): void {
    const persons = this.taskForm.value.persons!.map(x => {
      return {
        completeName: x.completeName!,
        years: x.years!,
        skills: x.skills.map((x: { skill: string; }) => x.skill) as string[]
      }
    });
    const task = {
      id: Math.floor(Math.random() * 1000000),
      name: this.taskForm.controls.name.value!,
      limitDate: this.taskForm.controls.limitDate.value!,
      status: TaskStatus.PENDING,
      persons: persons
    };
    this.store.dispatch(TaskActions.add({task}))
    this.modalService.open(SuccessModalComponent);
    this.taskForm = this.createDefaultForm();
  }
}
