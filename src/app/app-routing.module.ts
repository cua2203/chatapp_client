import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { StarterComponent } from './components/starter/starter.component';
import { AuthGuard } from './core/guards/auth-guard.guard';
import { UsersComponent } from './features/users/users.component';
import { ProfileSettingComponent } from './features/profile-setting/profile-setting.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: StarterComponent },
      { path: 'user', component: UsersComponent},
      { path: 'profile', component: ProfileSettingComponent },
      // { path: '**', component: StarterComponent }  // Default route
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
