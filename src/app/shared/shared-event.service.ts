import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedEventService {
  private clientReloadSource = new BehaviorSubject<boolean>(false);
  clientReload$ = this.clientReloadSource.asObservable();

  emitClientReload() {
    this.clientReloadSource.next(true);
  }
}
