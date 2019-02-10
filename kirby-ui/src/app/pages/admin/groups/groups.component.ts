import { GroupNode } from './interfaces';
import { Group } from './../../../services/groups/interfaces';
import { GroupService } from './../../../services/groups/index';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of as ObservableOf } from 'rxjs';
import { TreeComponent } from 'angular-tree-component';


@Component({
  selector: 'admin-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class AdminGroupComponent {
  @ViewChild(TreeComponent) set tree(t: TreeComponent) {
    this.showGroups();
  }

  public isLoading: boolean = true;
  public nodes: GroupNode[];

  options = {
    rtl: true,
    allowDrag: true,
    allowDrop: true
  };

  constructor(private groupService: GroupService) { }

  private showGroups() {
    this.groupService.getAll()
      .subscribe((groups: Group[]) => {
        this.nodes = this.convertGroupsListToTree(groups);
        this.isLoading = false;
      });
  }

  private convertGroupsListToTree(groups: Group[]): GroupNode[] {
    let treeData: GroupNode[] = [], parents = {};

    groups.forEach((group: Group) => {
      if (group.parent in parents) {
        treeData[parents[group.parent]].children.push({ name: group.name });
      }
      else if (group.parent) {
        parents[group.parent] = treeData.push({ name: group.parent, children: [{ name: group.name }] }) - 1;
      }
    });

    return treeData;
  }

  private createGroup() {
    let group = null;
    this.groupService.create(group)
      .pipe(catchError(err => {
        console.error(err);
        return ObservableOf(err);
      }));
  }

}