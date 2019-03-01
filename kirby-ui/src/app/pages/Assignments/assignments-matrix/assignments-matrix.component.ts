import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from './../../../services/assignments/index';
import { Component, OnInit } from '@angular/core';
import { EventNotification } from 'src/app/components/event-list/interfaces';
import { AuthenticationService } from 'src/app/services/authentication';
import { Assignment } from 'src/app/services/assignments/interfaces';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Module } from 'src/app/services/modules/interfaces';
@Component({
    selector: 'assignments-matrix',
    templateUrl: './assignments-matrix.component.html',
    styleUrls: ['./assignments-matrix.component.scss']
})
export class AssignmentsMatrixComponent implements OnInit {
    public title: string = 'מטריצה';
    public columns: Module[] = [];

    constructor(
        private assignmentsService: AssignmentsService,
        private auth: AuthenticationService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            let moduleId: string = params.get('moduleId');

            this.assignmentsService.get()
                .subscribe((allAssignments: Assignment[]) => {
                    console.log({allAssignments})
                    this.columns = this.getColumns(allAssignments);
                });
        });
    }

    private getColumns(assignments: Assignment[]) {
        let columns = [];
        assignments.forEach((assignment: Assignment) => {
            assignment.modules.forEach(module => columns.push(module));
        });
        return _.uniq(columns);
    }
}


const a = 
{
    "allAssignments": [
        {
            "_id": {
                "$oid": "5c769f817741c82a2b282355"
            },
            "user_id": {
                "$oid": "5c503c00170a4fabfe273a25"
            },
            "activity_id": {
                "$oid": "5c769aa47741c8754f6a839f"
            },
            "status": "opened",
            "activity": {
                "_id": {
                    "$oid": "5c769aa47741c8754f6a839f"
                },
                "name": "sql guiding qs",
                "files": [
                    {
                        "_id": {
                            "$oid": "5c769aa37741c8754f6a839b"
                        },
                        "filename": "activity_sql_guiding_qs_marigold.pdf",
                        "md5": "010c8c64d6c497486504e1efea001d4d",
                        "chunkSize": 261120,
                        "length": 198565,
                        "uploadDate": {
                            "$date": 1551276708563
                        }
                    },
                    {
                        "_id": {
                            "$oid": "5c769aa47741c8754f6a839d"
                        },
                        "filename": "activity_sql_guiding_qs_marigold.pdf",
                        "md5": "010c8c64d6c497486504e1efea001d4d",
                        "chunkSize": 261120,
                        "length": 198565,
                        "uploadDate": {
                            "$date": 1551276708569
                        }
                    }
                ]
            },
            "modules": [
                {
                    "_id": {
                        "$oid": "5c769c107741c80c57072f6c"
                    },
                    "name": "mamas47",
                    "activities": [
                        {
                            "$oid": "5c769c107741c80c57072f6c"
                        }
                    ]
                },
                {
                    "_id": {
                        "$oid": "5c779deb7741c83b257f55f6"
                    },
                    "name": "mamas46",
                    "activities": [
                        {
                            "$oid": "5c769c107741c80c57072f6c"
                        },
                        {
                            "$oid": "5c769aa47741c8754f6a839f"
                        }
                    ]
                },
                {
                    "_id": {
                        "$oid": "5c769d877741c81b9cbc17a4"
                    },
                    "name": "sql",
                    "parent": {
                        "$oid": "5c769c107741c80c57072f6c"
                    },
                    "activities": [
                        {
                            "$oid": "5c769aa47741c8754f6a839f"
                        }
                    ]
                }
            ]
        }
    ]
};

// columns: [all the modules, uniq]
// rows: [ student name, module, status, redoCount ] => every student must have all the modules, even if didn't exist