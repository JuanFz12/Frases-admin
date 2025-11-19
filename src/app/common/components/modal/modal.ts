/* import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { Component, inject, input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
} from '@angular/material/dialog';
@Component({
  selector: 'app-modal',
  imports: [ MatDialogContent, PortalModule],
  templateUrl: './modal.html',
  styles: ``,
})
export class Modal {
  dialogRef = inject(MatDialogRef<Modal>);
  data = inject(MAT_DIALOG_DATA, { optional: true });
  get portal() {
    return this.data.component ?
      new ComponentPortal(this.data.component) :
      null;
  }
}
 */

import { Component, input, inject, OnInit } from '@angular/core';
import { PortalModule, ComponentPortal } from '@angular/cdk/portal';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [PortalModule, MatDialogContent, MatDialogActions],
  templateUrl: './modal.html',
})
export class Modal implements OnInit {
  modalTitle = input<string>('Modal');
  dialogRef = inject(MatDialogRef<Modal>);
  data = inject(MAT_DIALOG_DATA, { optional: true });

  // propiedad que guardará el portal (crear solo una vez)
  portal?: ComponentPortal<any>;
  actionsPortal?: ComponentPortal<any>;

  ngOnInit(): void {
    // crear instancia del portal UNA sola vez
    if (this.data?.component) {
      this.portal = new ComponentPortal(this.data.component);
    }
    if (this.data?.actionsComponent) {
      this.actionsPortal = new ComponentPortal(this.data.actionsComponent);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
