import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Modal } from '@common/components/modal/modal';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private dialog = inject(MatDialog);

    open(options: {
        title?: string;
        width?: string;
        component?: any;   
        data?: any;
    }) {
        return this.dialog.open(Modal, {
            width: options.width ?? '500px',
            data: {
                component: options.component,
                content: options.data,
            },
        }).afterClosed();
    }

}