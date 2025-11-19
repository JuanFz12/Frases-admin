import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';

export type TableCell =
  | { type: 'text', value: string }
  | { type: 'component', component: Type<any>, inputs?: Record<string, any> };
@Component({
  selector: '[appTableRow]',
  imports: [CommonModule],
  templateUrl: './table-row.html',
  styles: ``,

})
export class TableRow {

}
