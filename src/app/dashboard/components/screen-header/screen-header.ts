import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ThemeText, ThemeButton, ThemedInput } from "@common/theme";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-screen-header',
  imports: [ThemeText, ThemeButton, ThemedInput, ReactiveFormsModule, MatIcon],
  templateUrl: './screen-header.html',
  styles: ``,
})
export class ScreenHeader {
  private _fb = inject(FormBuilder);
  title = input<string>('');
  showCreate = input<boolean>(false);
  createText = input<string>('Crear');
  showExport = input<boolean>(false);
  showImport = input<boolean>(false);
  myForm: FormGroup = this._fb.group({
    search: ["", []],
  });
}
