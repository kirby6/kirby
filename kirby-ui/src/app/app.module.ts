import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TreeModule } from 'angular-tree-component';

import { SocketIoModule } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/authentication/interceptors/jwt.interceptor';
import { CredentialsInterceptor } from './services/authentication/interceptors/credentials.interceptor';
import { TokenExpirationInterceptor } from './services/authentication/interceptors/token-expiration.interceptor';
import { CustomMaterialModule } from './app.material.module';
import { PluginsManagementDirective } from './directives/plugins.management.directive';
import { KAlertComponent } from './components/k-alert/k-alert.component';
import { AdminGroupComponent } from './pages/admin/groups/groups.component';
import { ActivitiesPageComponent } from './pages/admin/activities/activities.component';
import { ActivitiesListComponent } from './pages/admin/activities/activities-list/activities-list.component';
import { CreateActivityComponent } from './pages/admin/activities/create-activity/create-activity.component';
import { AdminPageComponent } from './pages/admin/admin.component';
import { WebsitesPageComponent } from './pages/websites/websites.component';
import { WebsiteCardComponent } from './components/website-card/website-card.component';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { TextareaFormCardComponent } from './components/textarea-form-card/textarea-form-card.component';
import { TruncateModule } from 'ng2-truncate';
import { AssignmentsPageComponent } from './pages/Assignments/assignments.component';
import { AssignmentPageComponent } from './pages/Assignment/assignment.component';
import { NavigationListComponent } from './components/navigation-list/navigation-list.component';
import { AssignmentsListComponent } from './pages/Assignments/assignments-list/assignments-list.component';
import { HelpsListComponent } from './pages/helps/helps-list/helps-list.component';
import { HelpPageComponent } from './pages/help/help.component';
import { RequestHelpComponent } from './pages/helps/request-help/request-help.component';
import { RequestHelpDialogComponent } from './pages/helps/request-help/request-help.component';
import { AssignmentsMatrixComponent } from './pages/Assignments/assignments-matrix/assignments-matrix.component';
import { RoleDirective } from './directives/role.directive';
import { AgGridModule } from 'ag-grid-angular';
import { AssignmentCellRenderer } from './pages/Assignments/assignments-matrix/custom-cells/assignments-cell.component';
import { ActivityFileComponent } from './pages/Assignment/activity-file/activity-file.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { GitSubmissionComponent } from './pages/Assignment/submissions/git-submission/git-submission.component';
import { FileSubmissionComponent } from './pages/Assignment/submissions/file-submission/file-submission.component';
import { AddNavigationItem } from './components/navigation-list/add-navigation-item/add-navigation-item.component';

@NgModule({
    declarations: [
        AppComponent,
        PluginsManagementDirective,
        RoleDirective,
        KAlertComponent,
        HomeComponent,
        MainComponent,
        LoginComponent,
        RegisterComponent,
        AdminPageComponent,
        AdminGroupComponent,
        ActivitiesPageComponent,
        ActivitiesListComponent,
        WebsitesPageComponent,
        WebsiteCardComponent,
        ActivityFileComponent,
        EventListComponent,
        AssignmentsPageComponent,
        AssignmentPageComponent,
        NavigationListComponent,
        AssignmentsListComponent,
        HelpsListComponent,
        AssignmentsMatrixComponent,
        CommentListComponent,
        AssignmentCellRenderer,
        HelpPageComponent,
        TextareaFormCardComponent,
        RequestHelpComponent,
        RequestHelpDialogComponent,
        GitSubmissionComponent,
        FileSubmissionComponent,
        AddNavigationItem,
        CreateActivityComponent,
    ],
    entryComponents: [
        RequestHelpDialogComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CustomMaterialModule,
        TreeModule.forRoot(),
        TruncateModule,
        SocketIoModule,
        AgGridModule.withComponents([AssignmentCellRenderer]),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenExpirationInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
