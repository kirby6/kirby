import { Output, EventEmitter } from '@angular/core';

export interface FormComponent {
    type: string;
}
export interface FormQuestion<T> extends FormComponent {
    question: T;
}

interface FormInput<T> {
    onAnswered: EventEmitter<T>;
}

interface SingleAnswer<T> extends FormInput<T> {
    answer?: T;
}

export interface Title extends FormComponent {
    type: 'title';
    text: string;
}
export interface RadioOption {
    label: string;
    selected: boolean;
}

export interface RadioInput extends FormQuestion<string>, FormInput<RadioOption> {
    type: 'radio';
    options: RadioOption[];
}

export interface TextInput extends FormQuestion<string>, SingleAnswer<string> {
    type: 'text';
    placeholder: string;
}
