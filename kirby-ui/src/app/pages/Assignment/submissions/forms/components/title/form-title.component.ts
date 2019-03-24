import { Title } from './../../interfaces';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'form-title-component',
    template: `
        <h2 *ngIf='text'>{{text}}</h2>
    `,
    styles: [`
        :host {
            display: block;
        }
    `]
})
export class FormTitleComponent{
    text: string;

    @Input() set component(c: Title) {
        this.text = c.text;
    }
} 