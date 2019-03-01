import { ModulesService } from './../../../services/modules/index';
import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from './../../../services/assignments/index';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication';
import * as _ from 'lodash';
import { Module } from 'src/app/services/modules/interfaces';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/services/activities/interfaces';
@Component({
    selector: 'assignments-matrix',
    templateUrl: './assignments-matrix.component.html',
    styleUrls: ['./assignments-matrix.component.scss']
})
export class AssignmentsMatrixComponent implements OnInit {
    public title: string = 'מטריצה';
    public modules: Module[] = [];
    public activities: Activity[];

    constructor(
        private assignmentsService: AssignmentsService,
        private modulesService: ModulesService,
        private auth: AuthenticationService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            let moduleId: string = params.get('moduleId');
            this.getModules(moduleId).pipe(map(this.normalizeHeaders))
                .subscribe((modules: Module[]) => {
                    this.modules = modules;
                    this.activities = modules.reduce((allActivities: Activity[], currModule: Module) => {
                        allActivities.push(...currModule.activities);
                        return allActivities;
                    }, []);
                    console.info({modules, activities: this.activities});
                });
        });
    }

    private normalizeHeaders(modules: Module[]) {
        return modules.map(m => ({ ...m, colspan: m.activities.length }));
    }

    private getModules(moduleId?: string): Observable<Module[]> {
        if (moduleId) {
            return this.modulesService.getById(moduleId).pipe(map(m => [m]));
        } else {
            return this.modulesService.getAll();
        }
    }
}


// columns: [all the modules, uniq]
// rows: [ student name, module, status, redoCount ] => every student must have all the modules, even if didn't exist