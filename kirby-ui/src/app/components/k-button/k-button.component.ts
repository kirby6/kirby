import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'k-button',
  templateUrl: './k-button.component.html',
  styleUrls: ['./k-button.component.scss']
})
export class KButtonComponent {

  @Input() disabled: boolean = false;

  getClass(): any {
    return {
      disabled: this.disabled
    }
  }
}
