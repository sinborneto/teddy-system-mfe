import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from '../../services/client.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-deleted-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule,],
  templateUrl: './deleted-dialog.component.html',
  styleUrl: './deleted-dialog.component.scss'
})
export class DeletedDialogComponent {

  client = {
    id: '',
    name: '',
    salary: 0,
    companyValuation: 0
  };

  constructor(
    public dialogRef: MatDialogRef<DeletedDialogComponent>,
    private clientService: ClientService,
    private loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.client = data.client;
  }

 onDeleted() {
  this.loadingService.show();
  this.clientService.deleteUser(this.client.id).subscribe(
    () => {
      this.dialogRef.close('deleted');
      this.loadingService.hide();
    }
  );
}

}
