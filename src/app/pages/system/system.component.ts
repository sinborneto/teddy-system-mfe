import { SharedService } from './../../../../../host/src/app/shared/shared.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';
import { CustomersComponent } from '../customers/customers.component';
import { CommonModule } from '@angular/common';
import { CustomersSelectedComponent } from "../customers-selected/customers-selected.component";



@Component({
  selector: 'app-system',
  imports: [SharedModule, TabsModule, CustomersComponent, CommonModule, CustomersSelectedComponent],
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss'
})
export class SystemComponent implements OnInit {
  private sharedService = inject(SharedService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  userName = '';
  sidebarVisible = false;
  logoPath = `${document.baseURI}assets/shared/image/logo_dark.svg`;
  activeTab = 0; 

  ngOnInit() {
    this.getUserName();
  }

  changeTab(index: string | number) {
    this.activeTab = Number(index);
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.clear(); 
    this.router.navigate(['/login']);
  }

  getUserName() {
    this.route.paramMap.subscribe((params) => {
      const nameFromUrl = params.get('name');
      if (nameFromUrl) {
        this.userName = nameFromUrl;
      } else {
        this.sharedService.currentUser.subscribe((data) => {
          this.userName = data?.nome || 'Usuário desconhecido';
        });
      }
    });
  }
}
