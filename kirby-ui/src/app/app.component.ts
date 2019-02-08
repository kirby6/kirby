import { Component } from '@angular/core';

@Component({
  selector: 'root',
  template: `
    <k-alert></k-alert>
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class AppComponent {
}
