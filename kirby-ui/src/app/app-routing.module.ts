import { EventListComponent } from './components/event-list/event-list.component';
import { AssignmentsPageComponent } from './pages/Assignments/assignments.component';
import { AssignmentPageComponent } from './pages/Assignment/assignment.component';
import { ActivitiesPageComponent } from './pages/admin/activities/activities.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { AdminPageComponent } from './pages/admin/admin.component';
import { WebsitesPageComponent } from './pages/websites/websites.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/authentication/gaurd';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AssignmentsListComponent } from './pages/Assignments/assignments-list/assignments-list.component';
import { ActivitiesListComponent } from './pages/admin/activities/activities-list/activities-list.component';
import { CreateActivityComponent } from './pages/admin/activities/create-activity/create-activity.component';
import { AssignmentsMatrixComponent } from './pages/Assignments/assignments-matrix/assignments-matrix.component';
import { HelpsListComponent } from './pages/helps/helps-list/helps-list.component';
import { HelpPageComponent } from './pages/help/help.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: HomeComponent },
            { path: 'websites', component: WebsitesPageComponent },
            { path: 'admin', component: AdminPageComponent },
            {
                path: 'assignments', component: AssignmentsPageComponent, children: [
                    { path: ':moduleId', component: AssignmentsListComponent, outlet: 'moduleAssignments' },
                    { path: ':moduleId', component: AssignmentsMatrixComponent, outlet: 'moduleMatrix' },
                    { path: '', component: AssignmentsListComponent, outlet: 'moduleAssignments' },
                    { path: '', component: AssignmentsMatrixComponent, outlet: 'moduleMatrix' },
                ]
            },
            {
                path: 'activities', component: ActivitiesPageComponent, children: [
                    { path: ':moduleId', component: ActivitiesListComponent, outlet: 'moduleActivities' },
                    { path: '', component: ActivitiesListComponent, outlet: 'moduleActivities' },
                    { path: ':moduleId', component: CreateActivityComponent, outlet: 'createActivity' },
                    { path: '', component: CreateActivityComponent, outlet: 'createActivity' },
                ]
            },
            { path: 'assignment/:assignmentId', component: AssignmentPageComponent },
            { path: 'helps', component: HelpsListComponent },
            { path: 'help/:helpId', component: HelpPageComponent },
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },



    // otherwise redirect to home
    { path: '**', redirectTo: '' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
