import { Group } from './../../../services/groups/interfaces';
import { GroupService } from './../../../services/groups/index';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of as ObservableOf } from 'rxjs';


@Component({
    selector: 'admin-groups',
    templateUrl: './groups.component.html'
})
export class AdminGroupComponent {

    constructor(private groupService: GroupService) { }



    private createGroup() {
        let group = null;
        this.groupService.create(group)
            .pipe(catchError(err => {
                console.error(err);
                return ObservableOf(err);
            }));
    }

}