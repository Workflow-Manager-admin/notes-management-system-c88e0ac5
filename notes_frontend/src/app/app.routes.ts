import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'notes', component: NoteListComponent, canActivate: [AuthGuard] },
  { path: 'notes/new', component: NoteFormComponent, canActivate: [AuthGuard] },
  { path: 'notes/edit/:id', component: NoteFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/notes' }
];
