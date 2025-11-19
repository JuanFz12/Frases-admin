import { Component, inject } from '@angular/core';
import { PhrasesService } from '@phrases/services/phrases.service';
import { ProgressSpinner, TableLayout, TableRow } from "@common/components";
import { MatPaginatorModule } from "@angular/material/paginator";
import { CreatePhraseUseCase, GetPhrasesUseCase, PhrasesDataSource, PhrasesRepository } from '@features/phrases/domain';
import { PhrasesDataSourceImpl, PhrasesRepositoryImpl } from '@features/phrases/infrastructure';
import { ColorBox } from "@phrases/components/color-box/color-box";
import { ThemeText } from "@common/theme";
import { ScreenHeader } from "@dashboard/components/screen-header/screen-header";
import { ModalService } from '@common/services/modal.service';
import { CreatePhrase } from '@phrases/components/create-phrase/create-phrase';
@Component({
  selector: 'app-phrases-page',
  imports: [ProgressSpinner, TableLayout, MatPaginatorModule, TableRow, ColorBox, ThemeText, ScreenHeader],
  templateUrl: './phrases-page.html',
  styles: ``,
  providers: [
    { provide: PhrasesDataSource, useClass: PhrasesDataSourceImpl },
    { provide: PhrasesRepository, useClass: PhrasesRepositoryImpl },
    GetPhrasesUseCase,
    CreatePhraseUseCase,
    PhrasesService
  ]
})
export class PhrasesPage {
  phrasesService = inject(PhrasesService);
  private _columns = [
    { key: 'id', label: 'ID' },
    { key: 'phrase', label: 'Frase' },
    { key: 'color', label: 'Color' },
    { key: 'updateAt', label: 'Actualización' },
  ];

  headers = this._columns.map(c => c.label);
  private modalService = inject(ModalService);
  openCreateModal() {
    this.modalService.open({
      title: 'Crear Frase',
      width: '600px',
      component: CreatePhrase,
    });
  }
}
