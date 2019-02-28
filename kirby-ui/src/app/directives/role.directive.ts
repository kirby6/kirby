import { AuthenticationService } from './../services/authentication/index';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from '../services/authentication/interfaces';

@Directive({
    selector: '[role]'
})
export class RoleDirective {
    @Input('role') set role(role: Role) {
        this.auth.currentUserValue.roles.some((r: Role) => r === role) ? this.show() : this.hide();
    };
    
    constructor(private auth: AuthenticationService,

        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) {
    }

    private show(): void {
        this.viewContainer.createEmbeddedView(this.templateRef);
    }

    private hide(): void {
        this.viewContainer.clear();
    }
}