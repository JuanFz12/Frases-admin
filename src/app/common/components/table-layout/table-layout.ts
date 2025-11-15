import { Component, contentChild, input } from '@angular/core';

@Component({
  selector: 'app-table-layout',
  imports: [],
  templateUrl: './table-layout.html',
  styles: ``
})
export class TableLayout {
  headers = input<string[]>([]);
  body = contentChild('tableBody');

}
