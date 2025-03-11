import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-customer-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule,],
  templateUrl: './customer-dialog.component.html',
  styleUrl: './customer-dialog.component.scss'
})
export class CustomerDialogComponent {

  
  client = {
    name: '',
    salary: 0,
    companyValuation: 0
  };
  
  constructor(public dialogRef: MatDialogRef<CustomerDialogComponent>, private clientService: ClientService) {}

  onCreate() {
    console.log(this.client);
    const clientFormatted = {
      name: this.client.name,
      salary: Number(this.client.salary),
      companyValuation: Number(this.client.companyValuation)
    }
    this.clientService.createUser(clientFormatted).subscribe(() => {
      this.dialogRef.close();
    })
  }

}
