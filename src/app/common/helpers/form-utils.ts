import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export type ValidatorKey =
    | 'required'
    | 'min'
    | 'max'
    | 'minlength'
    | 'maxlength'
    | 'email'
    | 'pattern'
    | 'emailTaken'
    | 'noStrider'
    | 'passwordsNotEqual'
    | string;

export const DEFAULT_ERROR_MESSAGES: Record<string, (error: any) => string> = {
    required: () => 'Este campo es obligatorio',
    email: () => 'El correo no es válido',
    minlength: (e) => `Mínimo ${e.requiredLength} caracteres`,
    maxlength: (e) => `Máximo ${e.requiredLength} caracteres`,
    min: (e) => `El mínimo permitido es ${e.min}`,
    max: (e) => `El máximo permitido es ${e.max}`,
    pattern: () => 'Formato inválido',
    emailTaken: () => 'Este correo ya está registrado',
    noStrider: () => 'Este nombre no está permitido',
    passwordsNotEqual: () => 'Las contraseñas no coinciden',
};

export class FormUtils {
    static getErrorMessage(
        errors: ValidationErrors | null | undefined,
        customMap?: Record<string, (e: any) => string>
    ): string | null {
        if (!errors) return null;
        const map = { ...DEFAULT_ERROR_MESSAGES, ...(customMap ?? {}) };
        for (const key of Object.keys(errors)) {
            const err = errors[key];
            const msg = map[key];

            if (msg) return msg(err);
            return `Error no manejado: ${key}`;
        }

        return null;
    }
    static getControl(form: FormGroup, field: string): AbstractControl | null {
        return form.get(field) ?? null;
    }

    static showError(form: FormGroup, field: string): boolean {
        const c = this.getControl(form, field);
        return !!c && c.invalid && (c.touched);
    }

    static getFieldError(
        form: FormGroup,
        field: string,
        customMessages?: Record<string, (e: any) => string>
    ): string | null {
        const c = this.getControl(form, field);
        return c ? this.getErrorMessage(c.errors, customMessages) : null;
    }
    static fieldsMatch(field1: string, field2: string) {
        return (group: AbstractControl): ValidationErrors | null => {
            const a = group.get(field1)?.value;
            const b = group.get(field2)?.value;

            return a === b ? null : { passwordsNotEqual: true };
        };
    }
    static emailExistsValidator(
        checkFn: (email: string) => Promise<boolean>
    ) {
        return async (control: AbstractControl): Promise<ValidationErrors | null> => {
            if (!control.value) return null;

            const exists = await checkFn(control.value);

            return exists ? { emailTaken: true } : null;
        };
    }
}
