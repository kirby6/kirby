import { RadioInput, RadioOption } from '../../interfaces';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'form-radio-component',
    template: `
        <label>{{question}}</label>
        <mat-radio-group [(ngModel)]="selectedOption">
            <mat-radio-button *ngFor="let option of options" [value]="option.label">
                {{option.label}}
            </mat-radio-button>
        </mat-radio-group>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
        }
        mat-radio-button {
            display: block;
        }
    `]
})
export class FormRadioInputComponent implements RadioInput {
    type: "radio";
    options: RadioOption[];
    question: string;
    answers: RadioOption[];

    @Input() set component(c: RadioInput) {
        this.question = c.question;
        this.options = c.options;
    }

    @Output() onAnswered: EventEmitter<RadioOption> = new EventEmitter();
    set selectedOption(option: RadioOption) {
        this.onAnswered.emit(option);
    }

} 