import { AbstractControl, ValidationErrors } from '@angular/forms';

export class TopicValidators{
    static noOfTopics(control: AbstractControl): ValidationErrors | null {
        if ((control.value as number) >= 5) {
            return {
                minlength: {
                    requiredLength: 5,
                    actualLength: control.value.length
                }
            }
        }
    }
}