import { Component } from '@angular/core';
import { SystemComponent } from "./pages/system/system.component";

@Component({
  selector: 'app-root',
  imports: [SystemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'system-mfe';
}
