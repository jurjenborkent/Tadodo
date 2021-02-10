import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./reset/reset.module').then( m => m.ResetPageModule)
  },
  {
    path: 'create-task',
    loadChildren: () => import('./create-task/create-task.module').then( m => m.CreateTaskPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create-repair-task',
    loadChildren: () => import('./create-repair-task/create-repair-task.module').then( m => m.CreateRepairTaskPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create-general-task',
    loadChildren: () => import('./create-general-task/create-general-task.module').then( m => m.CreateGeneralTaskPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'view-task/:id',
    loadChildren: () => import('./view-task/view-task.module').then( m => m.ViewTaskPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'update-task/:id',
    loadChildren: () => import('./update-task/update-task.module').then( m => m.UpdateTaskPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
