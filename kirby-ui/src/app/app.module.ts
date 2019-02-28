import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TreeModule } from 'angular-tree-component';

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
import { AdminPageComponent } from './pages/admin/admin.component';
import { WebsitesPageComponent } from './pages/websites/websites.component';
import { WebsiteCardComponent } from './components/website-card/website-card.component';
import { ActivityFileCardComponent } from './components/activity-file-card/activity-file-card.component';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { TruncateModule } from 'ng2-truncate';
import { AssignmentsPageComponent } from './pages/Assignments/assignments.component';
import { AssignmentPageComponent } from './pages/Assignment/assignment.component';
import { NavigationListComponent } from './pages/Assignments/navigation-list/navigation-list.component';
import { AssignmentsListComponent } from './pages/Assignments/assignments-list/assignments-list.component';
import { HelpsListComponent } from './pages/helps/helps-list/helps-list.component';
import { CommentListComponent } from './pages/Assignment/comment-list/comment-list.component';

@NgModule({
    declarations: [
        AppComponent,
        PluginsManagementDirective,
        KAlertComponent,
        HomeComponent,
        MainComponent,
        LoginComponent,
        RegisterComponent,
        AdminPageComponent,
        AdminGroupComponent,
        WebsitesPageComponent,
        WebsiteCardComponent,
        ActivityFileCardComponent,
        EventListComponent,
        AssignmentsPageComponent,
        AssignmentPageComponent,
        NavigationListComponent,
        AssignmentsListComponent,
        HelpsListComponent,
        CommentListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CustomMaterialModule,
        TreeModule.forRoot(),
        TruncateModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenExpirationInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
