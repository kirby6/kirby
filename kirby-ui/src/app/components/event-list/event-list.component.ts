import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
})

export class EventListComponent implements OnInit {


    @Input() public assignments: Assignment[] = [
    {
        id: '0',
        name: 'C# overview II',
        description: 'תרגול בC#',
    } 
    ];

    public get unreadCount(): number {
        return this.assignments && this.assignments.length || 0;
    }

    constructor() {
    }

    ngOnInit() {
    }

    getClass(assignment: Assignment) {
        return { read: !!assignment.isRead, unread: !assignment.isRead  };
    }

    onAssignmentSelected(assignment: Assignment): void {
        window.location.href = `/assignments/${assignment.id}`;
    }
}

interface Assignment {
    id: string;
    name: string;
    description: string;
    isRead?: boolean;
}