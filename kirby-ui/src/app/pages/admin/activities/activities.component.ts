import { ActivitiesService } from 'src/app/services/activities';
import { Activity } from 'src/app/services/activities/interfaces';
import { ModulesService } from 'src/app/services/modules';
import { Module } from 'src/app/services/modules/interfaces';
import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';
import { NavigationItem, NewNavigationItem } from 'src/app/components/navigation-list/interfaces';

@Component({
    selector: 'activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss']
})
export class ActivitiesPageComponent {
    public modules: NavigationItem[];
    private getModules$: Subject<NavigationItem> = new Subject();

    constructor(
        private activitiesService: ActivitiesService,
        private modulesService: ModulesService,
    ) { }

    ngOnInit() {
        this.getModules$
            .pipe(switchMap(() => this.getModules()))
            .subscribe((modules: NavigationItem[]) => {
                this.modules = modules;
            });
        this.getModules$.next();
    }

    private createTreeChildren(modules: any[], tree: any[], processed_modules: number) {
        if (processed_modules == modules.length) return;
        for (let module of modules) {
            if (!module.parent) continue;
            let parent = tree.find((m) => m.id == module.parent);
            if (parent && !parent.children.find((m) => m.id == module.id)) {
                parent.children.push({
                    id: module.id,
                    name: module.name,
                    parent: parent.id,
                    children: []
                });
                processed_modules++;
                this.createTreeChildren(modules, parent.children, processed_modules);
            }
        }
    }

    private createTree(modules: Module[]): any[] {
        let tree = [];
        for (let module of modules) {
            if (!module.parent && !tree.find((m) => m.id == module.id)) {
                tree.push({
                    id: module.id,
                    name: module.name,
                    children: []
                });
            }
        }
        this.createTreeChildren(modules, tree, tree.length);
        return tree;
    }

    private getModules(): Observable<any[]> {
        return this.modulesService
            .getAll()
            .pipe(
                map((modules: Module[]) => {
                    return this.createTree(modules);
                })
            );
    }

    public createModule(module: NewNavigationItem) {
        this.modulesService.create(module.name, module.parent).subscribe();
    }
}
