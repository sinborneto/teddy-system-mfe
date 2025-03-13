import { Component, OnInit } from '@angular/core';
import { CardClientComponent } from '../../components/card-client/card-client.component';
import { CommonModule } from '@angular/common';
import { SharedService } from '@shared/shared.service';

@Component({
  selector: 'app-customers-selected',
  imports: [CardClientComponent, CommonModule],
  templateUrl: './customers-selected.component.html',
  styleUrl: './customers-selected.component.scss'
})
export class CustomersSelectedComponent implements OnInit {

  constructor(private sharedService: SharedService) {}

  clients: any;

  ngOnInit() {
    this.getClients()
  }

  getClients() {
    this.sharedService.clientsSelected.subscribe((data) => {
      console.log(this.clients)
      this.clients = data;
    });
  }

  clearAllSelected() {
    this.sharedService.clearClients()
  }

}
