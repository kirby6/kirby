import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
})

export class EventListComponent implements OnInit {

    d;

    constructor() {
        this.d = (Date.now()).toString();
    }

    ngOnInit() {
    }
}