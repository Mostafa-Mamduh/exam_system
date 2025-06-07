import { Component } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateExamComponent } from './components/admin-dashboard/create-exam/create-exam.component';

@Component({
  selector: 'app-root',
  imports: [RegisterComponent , LoginComponent , RouterOutlet , NavbarComponent,CreateExamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'exam_system';
}
