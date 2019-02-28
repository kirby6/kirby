import { EventListComponent } from './components/event-list/event-list.component';
import { AssignmentsPageComponent } from './pages/Assignments/assignments.component';
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
import { AssignmentsMatrixComponent } from './pages/Assignments/assignments-matrix/assignments-matrix.component';

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
                    // { path: ':moduleId', component: AssignmentsMatrixComponent, outlet: 'moduleMatrix' },
                ]
            },
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
