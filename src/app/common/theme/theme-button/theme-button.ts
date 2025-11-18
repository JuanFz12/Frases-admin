import { Component, input, signal } from '@angular/core';
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'danger'
  | 'ghost';

@Component({
  selector: 'app-theme-button',
  imports: [],
  templateUrl: './theme-button.html',
  styles: ``,
})
export class ThemeButton {
  variant = input<ButtonVariant>('primary');
  class = input<string>('');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  classes = signal('');

  ngOnInit() {
    this.updateClasses();
  }

  ngOnChanges() {
    this.updateClasses();
  }
  private updateClasses() {
    const v = this.variant();

    const base = `px-4 py-3 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed`;

    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-[#3E4784]  hover:opacity-90  ',
      secondary: 'bg-[#EAECEE]  hover:opacity-90 ',
      outline:
        'border border-gray-400  hover:bg-gray-100 bg-transparent',
      danger: 'bg-red-600  hover:bg-red-700',
      ghost: 'bg-transparent  hover:bg-gray-100',
    };

    const disabled =
      this.disabled() || this.loading()
        ? 'opacity-60 cursor-not-allowed'
        : '';

    this.classes.set(`${base} ${variants[v]} ${disabled}`);
  }

}
