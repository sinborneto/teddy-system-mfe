import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ClientModel } from '../../services/client.service';
import { SharedService } from '@shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { DeletedDialogComponent } from '../deleted-dialog/deleted-dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

@Component({
  selector: 'app-card-client',
  imports: [CommonModule],
  templateUrl: './card-client.component.html',
  styleUrl: './card-client.component.scss'
})
export class CardClientComponent {
  private sharedService = inject(SharedService);

  constructor(public dialog: MatDialog){}


  @Input() userSelected = false
  @Input() dataUser: ClientModel = {
    name: 'sss',
    salary: 0,
    companyValuation: 0,
  }

  saveSelectedClient(client: any) {
    console.log(client)
    this.sharedService.setClient(client);
  }

  editClient(client: any) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '400px',
      data: { client: client }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado');
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
      });
    }
  }
}
