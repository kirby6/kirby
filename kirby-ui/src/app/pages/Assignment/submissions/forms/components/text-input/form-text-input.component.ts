import { TextInput } from '../../interfaces';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'form-text-component',
    template: `
        <label>{{question}}</label>
        <input  type="text" [placeholder]="placeholder" [(ngModel)]="answer"  />
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
        }
    `]
})
export class FormTextInputComponent implements TextInput {
    type: "text";
    placeholder: string;
    question: string;

    set answer(s: string) {
        this.onAnswered.emit(s);
    }

    @Output() onAnswered: EventEmitter<string> = new EventEmitter();

    @Input() set component(c: TextInput) {
        this.question = c.question;
        this.placeholder = c.placeholder;
    }

} 