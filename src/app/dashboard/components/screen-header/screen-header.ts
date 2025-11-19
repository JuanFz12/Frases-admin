import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ThemeText, ThemeButton, ThemedInput } from "@common/theme";

@Component({
  selector: 'app-screen-header',
  imports: [ThemeText, ThemeButton, ThemedInput, ReactiveFormsModule],
  templateUrl: './screen-header.html',
  styles: ``,
})
export class ScreenHeader {
  private _fb = inject(FormBuilder);
  title = input<string>('');
  showCreate = input<boolean>(false);
  showExport = input<boolean>(false);
  showImport = input<boolean>(false);
  myForm: FormGroup = this._fb.group({
    search: ["", []],
  });
}
