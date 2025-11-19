import { Component, contentChild, input } from '@angular/core';
import { ThemeText } from "@common/theme";

@Component({
  selector: 'app-table-layout',
  imports: [ThemeText],
  templateUrl: './table-layout.html',
  styles: ``
})
export class TableLayout {
  headers = input<string[]>([]);
  body = contentChild('tableBody');

}
