import { Component, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-themed-input',
  standalone: true,
  templateUrl: './theme-input.html',
})
export class ThemedInput {
  placeholder = input<string>('');
  name = input<string>('');
  type = input<string>('text');
  value = model<string>('');
  variant = input<'input' | 'textarea'>('input');
  disabled = signal(false);
  error = input<boolean>(false);

  constructor(private ngControl: NgControl) {
    ngControl.valueAccessor = {
      writeValue: (value: any) => this.value.set(value),
      registerOnChange: (fn: any) => this.valueEffect(fn),
      registerOnTouched: (fn: any) => (this.onTouched = fn),
      setDisabledState: (isDisabled: boolean) => this.disabled.set(isDisabled),
    };
  }

  private onTouched = () => { };

  private valueEffect(fn: (v: any) => void) {
    this.value.subscribe(fn);
  }
  onInput(event: Event) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value.set(target.value);
  }
  handleBlur() {
    this.onTouched();
  }
}
