import { AbstractControl, FormArray, ValidatorFn } from "@angular/forms";

export const validateName: ValidatorFn = (control: AbstractControl) => {
    const repeatName = (control.parent?.parent as FormArray)?.value.filter((x: { completeName: string; }) => x.completeName?.toLowerCase() === control.value?.toLowerCase()).length > 0;
    return repeatName ? {duplicated: true} : null;
}