import { Component, input } from '@angular/core';
import { ThemeText } from "@common/theme";

@Component({
  selector: 'color-box',
  imports: [ThemeText],
  templateUrl: './color-box.html',
  styles: ``,
})
export class ColorBox {
  color = input<string>('#ffffff');

}
