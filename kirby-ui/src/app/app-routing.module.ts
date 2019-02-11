import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { AdminPageComponent } from './pages/admin/admin.component';
import { WebsitesPageComponent } from './pages/websites/websites.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/authentication/gaurd';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: HomeComponent },
            { path: 'websites', component: WebsitesPageComponent },
            { path: 'admin', component: AdminPageComponent },
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
