import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KButtonComponent } from './components/k-button/k-button.component';
import { HomeComponent } from './pages/home/home.component';
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

@NgModule({
  declarations: [
    AppComponent,
    PluginsManagementDirective,
    KButtonComponent,
    KAlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminPageComponent,
    AdminGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomMaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenExpirationInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
