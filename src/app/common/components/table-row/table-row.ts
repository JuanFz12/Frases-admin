import { Component, input } from '@angular/core';

@Component({
  selector: '[appTableRow]',
  imports: [],
  templateUrl: './table-row.html',
  styles: ``,

})
export class TableRow {
  values = input<string[]>();

}
