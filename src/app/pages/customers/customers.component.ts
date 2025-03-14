import { Component, OnInit } from '@angular/core';
import { CardClientComponent } from '../../components/card-client/card-client.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ClientModel, ClientService } from '../../services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomerDialogComponent } from '../../customer-dialog/customer-dialog.component';
import { LoadingService } from '../../services/loading.service';
import { Subscription } from 'rxjs';
import { SharedEventService } from '../../shared/shared-event.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-customers',
  imports: [CardClientComponent, FormsModule , PaginatorModule, HttpClientModule, CommonModule, MatDialogModule, ProgressSpinnerModule, DropdownModule  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {

  constructor(
    private readonly clientService: ClientService,
    public dialog: MatDialog,
    private loadingService: LoadingService,
    private sharedEventService: SharedEventService
  ) {}

  totalPages!: number;
  currentPage: number = 1;
  rowsPerPage = { value: 16 };;
  rowsPerPageList = [
    { value: 1 },
    { value: 10 },
    { value: 16 },
    { value: 20 },
    { value: 30 }
  ];
  clients: ClientModel[] = [];
  rows: number = 1;
  client: ClientModel = {
    name: '',
    salary: 0,
    companyValuation: 0
  };
  isLoading: boolean = false;
  subscriptions: Subscription[] = [];


  ngOnInit() {
    this.loadClients(this.currentPage, this.rowsPerPage.value);
    this.subscriptions.push(
      this.loadingService.isLoading$.subscribe(status => {
        this.isLoading = status;
      })
    );
    this.sharedEventService.clientReload$.subscribe(() => {
      this.loadClients(this.currentPage, this.rowsPerPage.value);
    });
  }

  loadClients(page: number, rows: number) {
    this.loadingService.show();
    this.clientService.getUsers(page, rows).subscribe((data: any) => {
      this.clients = data.clients;
      this.totalPages = data.totalPages;
      this.loadingService.hide();
    });
  }

  createClient(): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'created') {
        this.loadClients(this.currentPage, this.rowsPerPage.value);
      }
    });
  }

  onRowsPerPageChange(event: any) {
    this.loadClients(1, event.value.value);
  }

  paginate(event: PaginatorState) {
    this.currentPage = (event.page || 0) + 1;
    this.loadClients(this.currentPage, this.rowsPerPage.value);
  }

  onClientReload() {
    this.loadClients(this.currentPage, this.rowsPerPage.value);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
