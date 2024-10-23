import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarterComponent } from './components/starter/starter.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UsersComponent } from './features/users/users.component';
import { ProfileSettingComponent } from './features/profile-setting/profile-setting.component';

@NgModule({
  declarations: [
    AppComponent,
    StarterComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    UsersComponent,
    ProfileSettingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule ,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing',
        timeOut: 3000,
        extendedTimeOut: 2000,
      }
    ) 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
