import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from '../../services/client.service';
import { LoadingService } from '../../services/loading.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';


@Component({
  selector: 'app-update-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, InputTextModule, FloatLabelModule],
  templateUrl: './update-dialog.component.html',
  styleUrl: './update-dialog.component.scss'
})
export class UpdateDialogComponent {

  client = {
    id: '',
    name: '',
    salary: 0,
    companyValuation: 0
  };

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    private clientService: ClientService,
    private loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.client = data.client;
  }

  onUpdate() {
    const clientFormatted = {
      name: this.client.name,
      salary: Number(this.client.salary),
      companyValuation: Number(this.client.companyValuation)
    }
    this.clientService.updateUser(this.client.id, clientFormatted).subscribe(() => {
      this.dialogRef.close('updated');
      this.loadingService.hide();
    })
  }

}
