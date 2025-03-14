import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ClientModel } from '../../services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { DeletedDialogComponent } from '../deleted-dialog/deleted-dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { SharedService } from '@teddy-teste/shared';
import { SharedEventService } from '../../shared/shared-event.service';


@Component({
  selector: 'app-card-client',
  imports: [CommonModule],
  templateUrl: './card-client.component.html',
  styleUrl: './card-client.component.scss'
})
export class CardClientComponent {
  private sharedService = inject(SharedService);

  @Input() userSelected = false
  @Input() dataUser: ClientModel = {
    name: 'sss',
    salary: 0,
    companyValuation: 0,
  }


  constructor(public dialog: MatDialog, private sharedEventService: SharedEventService){}

  saveSelectedClient(client: any) {
    this.sharedService.setClient(client);
  }

  editClient(client: any) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '400px',
      data: { client: client }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.sharedEventService.emitClientReload();
      }
    });
  }

  deleteOrRemove(client: any) {
    if(this.userSelected === true) {
      this.sharedService.removeClientById(client.id);
    } else {
      const dialogRef = this.dialog.open(DeletedDialogComponent, {
        width: '400px',
        data: { client: client }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'deleted') {
          this.sharedEventService.emitClientReload();
        }
      });
    }
  }
}
