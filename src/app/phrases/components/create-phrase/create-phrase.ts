import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormUtils } from '@common/helpers';
import { ThemeButton, ThemeText, ThemedInput } from "@common/theme";
import { CreatePhraseUseCase, PhrasesDataSource, PhrasesRepository, PhrasesDataSourceImpl, PhrasesRepositoryImpl, GetPhrasesUseCase } from '@features/phrases';
import { PhrasesService } from '@phrases/services/phrases.service';

@Component({
  selector: 'app-create-phrase',
  imports: [ThemeButton, ThemeText, ThemedInput, ReactiveFormsModule],
  templateUrl: './create-phrase.html',
  styles: ``,
  providers: [
    { provide: PhrasesDataSource, useClass: PhrasesDataSourceImpl },
    { provide: PhrasesRepository, useClass: PhrasesRepositoryImpl },
    CreatePhraseUseCase,
    PhrasesService,
    GetPhrasesUseCase
  ]
})
export class CreatePhrase {
  private dialogRef = inject(MatDialogRef<CreatePhrase>);
  private _fb = inject(FormBuilder);
  private _phrasesService = inject(PhrasesService);
  createMutation = this._phrasesService.create;
  errorMessage = this._phrasesService.errorMessage;
  myForm: FormGroup = this._fb.group({
    color: ["", [Validators.required, Validators.minLength(3)]],
    phrase: ['', [Validators.required, Validators.minLength(3)]],
  });
  formUtils = FormUtils;
  close() {
    this.dialogRef.close();
  }

  async save() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    try {
      await this.createMutation.mutateAsync({
        color: this.myForm.controls['color'].value,
        text: this.myForm.controls['phrase'].value,
      });
      this.myForm.reset({ color: '', phrase: '' });
      this.close();
    } catch (err) {
      console.log(err);
    }
  }
}
