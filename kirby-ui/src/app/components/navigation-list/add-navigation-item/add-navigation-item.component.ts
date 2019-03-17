import { Component, ChangeDetectorRef, ViewChild, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'add-navigation-item',
    templateUrl: './add-navigation-item.component.html',
    styleUrls: ['./add-navigation-item.component.scss']
})
export class AddNavigationItem {
    public isButtonClicked: boolean;
    public input: string;
    @Input() public label: string;

    @ViewChild('itemInput') private itemInput;

    @Output()
    public onAdd: EventEmitter<string> = new EventEmitter();

    constructor(private changeDetector: ChangeDetectorRef) { }

    public clickButton() {
        this.isButtonClicked = true;
        this.changeDetector.detectChanges();
        this.itemInput.nativeElement.focus();
    }

    public inputLoseFocus() {
        this.isButtonClicked = false;
        this.input = null;
    }

    public inputKeyPress($event) {
        if ($event.key !== "Enter") {
            return;
        }
        this.onAdd.emit(this.input);
        this.inputLoseFocus();
    }
}
