import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'textarea-form-card',
    templateUrl: './textarea-form-card.component.html',
    styleUrls: ['./textarea-form-card.component.scss']
})
export class TextareaFormCardComponent {
    @Input()
    public inputLabel: string;
    @Input()
    public buttonLabel: string;

    @Output()
    public onSubmit: EventEmitter<string> = new EventEmitter();

    public input: string;

    public submit() {
        this.onSubmit.emit(this.input);
    }
} 
