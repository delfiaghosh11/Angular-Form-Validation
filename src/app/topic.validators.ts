import { AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

export class TopicValidators{
    public static minLength(min: number): ValidatorFn | any {
        return (control: AbstractControl[]) => {
            if (!(control instanceof FormArray)) return;
            return control.length < min ? { minLength: true } : null;
        }
    }
}
