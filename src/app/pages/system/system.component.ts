import { SharedService } from './../../../../../host/src/app/shared/shared.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'primeng/api';


@Component({
  selector: 'app-system',
  imports: [SharedModule],
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss'
})
export class SystemComponent implements OnInit {
  private sharedService = inject(SharedService);
  private route = inject(ActivatedRoute);

  userName = '';

  ngOnInit() {
    this.getUserName();
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
