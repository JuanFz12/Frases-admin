import { Component, inject } from '@angular/core';
import { PhrasesService } from '@phrases/services/phrases.service';
import { ProgressSpinner, TableLayout, TableRow } from "@common/components";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { GetPhrasesUseCase, PhrasesDataSource, PhrasesRepository } from '@features/phrases/domain';
import { PhrasesDataSourceImpl, PhrasesRepositoryImpl } from '@features/phrases/infrastructure';
import { ColorBox } from "@phrases/components/color-box/color-box";
import { ThemeText } from "@common/theme";
import { ScreenHeader } from "@dashboard/components/screen-header/screen-header";
@Component({
  selector: 'app-phrases-page',
  imports: [ProgressSpinner, TableLayout, MatPaginator, MatPaginatorModule, TableRow, ColorBox, ThemeText, ScreenHeader],
  templateUrl: './phrases-page.html',
  styles: ``,
  providers: [
    { provide: PhrasesDataSource, useClass: PhrasesDataSourceImpl },
    { provide: PhrasesRepository, useClass: PhrasesRepositoryImpl },
    GetPhrasesUseCase,
    PhrasesService
  ]
})
export class PhrasesPage {
  phrasesService = inject(PhrasesService);
  updatedAt = new Date();
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'phrase', label: 'Frase' },
    { key: 'color', label: 'Color' },
    { key: 'updateAt', label: 'Actualización' },
  ];

  a = this.columns.map(c => c.label);

}
