import { Component, OnInit } from '@angular/core';
import { CardClientComponent } from '../../components/card-client/card-client.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ClientModel, ClientService } from '../../services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomerDialogComponent } from '../../customer-dialog/customer-dialog.component';


@Component({
  selector: 'app-customers',
  imports: [CardClientComponent, PaginatorModule, HttpClientModule, CommonModule, MatDialogModule ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {

  constructor(private readonly clientService: ClientService, public dialog: MatDialog) {}

  totalPages: number = 0;
  currentPage: number = 0;
  rowsPerPage: number = 9999;
  clients: any[] = [];

  client: ClientModel = {
    name: '',
    salary: 0,
    companyValuation: 0
  };

  ngOnInit() {
    this.loadClients(this.currentPage, this.rowsPerPage);
  }

  loadClients(page: number, rows: number) {
    this.clientService.getUsers(page, rows).subscribe((data: any) => {
      this.clients = data.clients;
      this.totalPages = data.totalRecords;
    });
  }

  createClient(): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado');
    });
  }

  onPageChange(event: PaginatorState) {
    console.log(event)
    this.currentPage = event.first as number / (event.rows as number);
    this.rowsPerPage = event.rows as number;
    this.loadClients(this.currentPage, this.rowsPerPage);
  }
}
