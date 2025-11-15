import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AppRoutes } from '../../../../common/constants';
@Component({
  selector: 'app-menu-items',
  imports: [RouterLink],
  templateUrl: './menu-items.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ``
})
export class MenuItems {
  @Input({ required: true }) node!: AppRoutes;
  expanded = signal(false);

  toggleExpand() {
    if (this.node.children?.length) this.expanded.update(v => !v);
  }

}
